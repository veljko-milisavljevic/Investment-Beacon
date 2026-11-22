import OpenAI from 'openai';
import { getStaticFile, throwIfMissing } from './utils.js';

export default async ({ req, res }) => {
  console.log('––– RAW REQ.BODY TYPE:', typeof req.body);
  console.log('––– RAW REQ.BODY VALUE:', req.body);
  console.log('––– PARSED REQ.BODYJSON:', req.bodyJson);
  throwIfMissing(process.env, ['OPENAI_API_KEY']);

  if (req.method === 'GET') {
    return res.text(getStaticFile('index.html'), 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }
let body;
  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body);
    } catch (err) {
      return res.json(
        { ok: false, error: 'Invalid JSON payload' },
        400
      );
    }
  } else if (typeof req.body === 'object') {
    // In case Appwrite ever supplies an object directly
    body = req.body;
  } else {
    return res.json(
      { ok: false, error: 'Unsupported request body format' },
      400
    );
  }
  try {
    throwIfMissing(body, ['prompt']);
  } catch (err) {
    return res.json({ ok: false, error: err.message }, 400);
  }

  const openai = new OpenAI();

  const models = await openai.models.list();
  console.log(models.data.map(m => m.id));

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS ?? '512'),
      messages: [{ role: 'user', content: body.prompt }],
    });
    const completion = response.choices[0].message.content;
    return res.json({ ok: true, completion }, 200);
  } catch (err) {
    return res.json({ ok: false, error: 'Failed to query model.' }, 500);
  }
};
