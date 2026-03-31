export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { message, clientName } = body

  const endpoint = process.env.AI_ENDPOINT

  if (endpoint) {
    try {
      const res = await $fetch(endpoint, {
        method: 'POST',
        body: { message, clientName },
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      })
      return res
    } catch (e: any) {
      return { reply: `Fehler beim AI-Endpoint: ${e?.message ?? 'Unbekannt'}` }
    }
  }

  // Mock fallback
  const mocks: Record<string, string> = {
    default: `Ich bin ein Demo-Assistent für ${clientName}. Kein AI_ENDPOINT konfiguriert.`,
    risiko: `Das Risikoprofil von ${clientName} ist konservativ mit Fokus auf Kapitalerhalt.`,
    performance: `Das Portfolio von ${clientName} hat dieses Jahr +6.8% erzielt.`,
    empfehlung: `Basierend auf dem aktuellen Marktumfeld empfehle ich für ${clientName} eine leichte Erhöhung der Anleihequote.`,
  }

  const key = Object.keys(mocks).find(k => message.toLowerCase().includes(k)) ?? 'default'
  await new Promise(r => setTimeout(r, 800)) // simulate latency
  return { reply: mocks[key] }
})
