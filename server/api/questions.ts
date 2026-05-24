export default defineCachedEventHandler(
  async (_event) => {
    const config = useRuntimeConfig();
    const BASE_ID = config.airtableBaseId;
    const API_KEY = config.airtableApiKey;

    if (!BASE_ID || !API_KEY) {
      console.warn("Airtable API keys are missing. Returning empty array.");
      return [];
    }

    const allRecords = [];
    let offset = "";

    try {
      do {
        let url = `https://api.airtable.com/v0/${BASE_ID}/Questions?filterByFormula={status}='published'`;
        if (offset) {
          url += `&offset=${offset}`;
        }

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Airtable API returned ${res.status}: ${await res.text()}`);
        }

        const data = await res.json();
        if (data.records) {
          allRecords.push(...data.records);
        }
        offset = data.offset;
      } while (offset);

      return allRecords
        .map((record) => {
          const f = record.fields;

          if (f.correctChoice === undefined || f.correctChoice === null) {
            return null;
          }

          let choices: string[] = [];
          if (f.choices) {
            try {
              choices = JSON.parse(f.choices);
            } catch {
              choices = String(f.choices)
                .split("\n")
                .filter((s) => s.trim() !== "");
            }
          }

          return {
            id: f.id,
            officialCategory: f.officialCategory,
            tags: f.tags || [],
            questionText: f.questionText,
            choices: choices,
            correctChoice: f.correctChoice,
            explanation: f.explanation,
            choiceExplanations: f.choiceExplanations || undefined,
          };
        })
        .filter(Boolean);
    } catch (error) {
      console.error("Error fetching questions from Airtable:", error);
      throw createError({ statusCode: 502, message: "Failed to fetch from Airtable" });
    }
  },
  {
    maxAge: 60 * 60,
    swr: true,
  },
);
