const BASE_ID = process.env.NUXT_AIRTABLE_BASE_ID;
const API_KEY = process.env.NUXT_AIRTABLE_API_KEY;

async function getTables() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    if (!res.ok) {
      console.error(await res.text());
      return;
    }
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

getTables();
