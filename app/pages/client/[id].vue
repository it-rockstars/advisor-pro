<template>
  <div v-if="client" class="max-w-lg mx-auto pb-24">

    <!-- Header -->
    <div class="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="text-brand-500 text-2xl leading-none">‹</NuxtLink>
        <div class="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-600 text-sm">
          {{ client.initials }}
        </div>
        <div class="flex-1">
          <p class="font-bold text-gray-900 leading-tight">{{ client.name }}</p>
          <p class="text-xs text-gray-400">{{ client.risk }} · {{ client.advisor }}</p>
        </div>
      </div>
    </div>

    <div class="px-4 pt-4 space-y-4">

      <!-- Portfolio value card -->
      <div class="bg-brand-500 rounded-2xl p-5 text-white">
        <p class="text-sm text-brand-100 mb-1">Portfoliowert</p>
        <p class="text-3xl font-bold">{{ formatCurrency(client.portfolioValue) }}</p>
        <div class="flex gap-4 mt-2 text-sm">
          <span :class="client.change1d >= 0 ? 'text-emerald-300' : 'text-red-300'">
            {{ client.change1d >= 0 ? '▲' : '▼' }} {{ Math.abs(client.change1d) }}% heute
          </span>
          <span :class="client.change1y >= 0 ? 'text-emerald-300' : 'text-red-300'">
            {{ client.change1y >= 0 ? '▲' : '▼' }} {{ Math.abs(client.change1y) }}% 1J
          </span>
        </div>
      </div>

      <!-- Allocation -->
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm font-semibold text-gray-700 mb-3">Allokation</p>
        <!-- Bar -->
        <div class="flex rounded-full overflow-hidden h-3 mb-3">
          <div
            v-for="a in client.allocation" :key="a.label"
            :style="{ width: a.pct + '%', backgroundColor: a.color }"
          />
        </div>
        <div class="flex flex-wrap gap-3">
          <div v-for="a in client.allocation" :key="a.label" class="flex items-center gap-1.5 text-xs text-gray-600">
            <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ backgroundColor: a.color }"></span>
            {{ a.label }} {{ a.pct }}%
          </div>
        </div>
      </div>

      <!-- Positions -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <p class="text-sm font-semibold text-gray-700 px-4 pt-4 pb-2">Positionen</p>
        <div class="divide-y divide-gray-50">
          <div v-for="p in client.positions" :key="p.name" class="flex items-center px-4 py-3 gap-3">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ p.name }}</p>
              <p class="text-xs text-gray-400">{{ p.type }}</p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-sm font-semibold text-gray-900">{{ formatCurrency(p.value) }}</p>
              <p class="text-xs" :class="p.change > 0 ? 'text-emerald-600' : p.change < 0 ? 'text-red-500' : 'text-gray-400'">
                {{ p.change > 0 ? '+' : '' }}{{ p.change }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Next meeting -->
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
        <div class="text-2xl">📅</div>
        <div>
          <p class="text-xs text-gray-400">Nächstes Meeting</p>
          <p class="text-sm font-semibold text-gray-800">{{ formatDate(client.nextMeeting) }}</p>
        </div>
      </div>

      <!-- AI Chat -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-4 pt-4 pb-2 flex items-center gap-2">
          <span class="text-lg">🤖</span>
          <p class="text-sm font-semibold text-gray-700">KI-Assistent</p>
        </div>

        <!-- Messages -->
        <div ref="chatBox" class="px-4 space-y-2 max-h-56 overflow-y-auto pb-2">
          <div v-if="messages.length === 0" class="text-xs text-gray-400 py-2">
            Frag etwas zu {{ client.name }}…
          </div>
          <div v-for="m in messages" :key="m.id" :class="m.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
            <div
              class="max-w-[80%] px-3 py-2 rounded-2xl text-sm"
              :class="m.role === 'user'
                ? 'bg-brand-500 text-white rounded-br-sm'
                : 'bg-gray-100 text-gray-800 rounded-bl-sm'"
            >
              {{ m.text }}
            </div>
          </div>
          <div v-if="loading" class="flex justify-start">
            <div class="bg-gray-100 text-gray-400 px-3 py-2 rounded-2xl text-sm rounded-bl-sm">…</div>
          </div>
        </div>

        <!-- Input -->
        <div class="px-4 pb-4 pt-2 flex gap-2">
          <input
            v-model="input"
            @keydown.enter="send"
            type="text"
            placeholder="Frage stellen…"
            class="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            @click="send"
            :disabled="loading || !input.trim()"
            class="bg-brand-500 disabled:opacity-40 text-white rounded-xl px-4 py-2 text-sm font-medium active:scale-95 transition-transform"
          >
            ↑
          </button>
        </div>
      </div>

    </div>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen text-gray-400">
    Klient nicht gefunden
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const clients = useClients()
const client = computed(() => clients.find(c => c.id === route.params.id))

const messages = ref<{id: number, role: 'user'|'assistant', text: string}[]>([])
const input = ref('')
const loading = ref(false)
const chatBox = ref<HTMLElement>()
let msgId = 0

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v)

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })

async function send() {
  const text = input.value.trim()
  if (!text || loading.value) return
  input.value = ''
  messages.value.push({ id: msgId++, role: 'user', text })
  loading.value = true
  await nextTick()
  chatBox.value?.scrollTo({ top: 9999, behavior: 'smooth' })

  try {
    const res = await $fetch('/api/chat', {
      method: 'POST',
      body: { message: text, clientId: client.value?.id, clientName: client.value?.name }
    })
    messages.value.push({ id: msgId++, role: 'assistant', text: (res as any).reply })
  } catch {
    messages.value.push({ id: msgId++, role: 'assistant', text: '⚠️ Fehler beim Abrufen der Antwort.' })
  } finally {
    loading.value = false
    await nextTick()
    chatBox.value?.scrollTo({ top: 9999, behavior: 'smooth' })
  }
}
</script>
