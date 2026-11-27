const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' };
  if (event.httpMethod !== 'GET') return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) };
  const key = process.env.BRAVE_SEARCH_API_KEY;
  if (!key) return { statusCode: 401, headers: cors, body: JSON.stringify({ error: 'Missing BRAVE_SEARCH_API_KEY' }) };
  const q = String(event.queryStringParameters?.q || 'paritarias Argentina acuerdos salariales recientes').slice(0, 220);
  const queries = [q, 'Argentina paritarias convenios acuerdos homologados nuevas escalas salariales recientes'];
  try {
    const all = await Promise.all(queries.map(async query => {
      const url = new URL('https://api.search.brave.com/res/v1/web/search');
      url.searchParams.set('q', query);
      url.searchParams.set('count', '8');
      url.searchParams.set('freshness', 'pm');
      const resp = await fetch(url, { headers: { 'X-Subscription-Token': key, 'Accept': 'application/json' } });
      if (!resp.ok) throw new Error(`Search API responded ${resp.status}`);
      const data = await resp.json();
      return (data.web?.results || []).map(item => ({
        title: item.title || 'Resultado web',
        description: item.description || '',
        url: item.url || '',
        date: item.page_age || item.age || ''
      })).filter(x => x.url && /^https?:\/\//i.test(x.url));
    }));
    const seen = new Set();
    const results = all.flat().filter(item => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    }).slice(0, 12);
    return { statusCode: 200, headers: cors, body: JSON.stringify({ query: q, checkedAt: new Date().toISOString(), results }) };
  } catch (error) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'Search service failed', detail: String(error.message || error) }) };
  }
};
