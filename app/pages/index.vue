<template>
  <div class="max-w-lg mx-auto px-4 pb-28">

    <!-- Header -->
    <div class="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4 -mx-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-widest">AdviceObjects</p>
          <h1 class="text-xl font-bold text-gray-900">Advisor Dashboard</h1>
        </div>
        <div class="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-bold">KH</div>
      </div>

      <!-- Tab bar -->
      <div class="flex gap-1 mt-3">
        <button
          v-for="t in tabs" :key="t.id"
          @click="activeTab = t.id"
          class="flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors"
          :class="activeTab === t.id ? 'bg-brand-500 text-white' : 'text-gray-500 hover:bg-gray-100'"
        >{{ t.label }}</button>
      </div>
    </div>

    <!-- ── CLIENTS tab ── -->
    <div v-if="activeTab === 'clients'" class="pt-4 space-y-3">
      <!-- AuM summary -->
      <div class="bg-brand-500 rounded-2xl p-4 text-white flex justify-between items-center">
        <div>
          <p class="text-xs text-brand-100">Assets under Management</p>
          <p class="text-2xl font-bold">{{ fmt(val.totalAuM) }}</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-brand-100">Heute</p>
          <p class="text-lg font-semibold" :class="val.totalChange1d >= 0 ? 'text-emerald-300' : 'text-red-300'">
            {{ val.totalChange1d >= 0 ? '+' : '' }}{{ val.totalChange1d }}%
          </p>
        </div>
      </div>

      <!-- Client cards -->
      <NuxtLink
        v-for="c in clients" :key="c.id"
        :to="`/client/${c.id}`"
        class="block bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-95 transition-transform"
      >
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-600 text-sm flex-shrink-0">
            {{ c.initials }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-gray-900 truncate">{{ c.name }}</p>
              <p class="font-bold text-sm ml-2 flex-shrink-0">{{ fmt(c.portfolioValue) }}</p>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-xs px-2 py-0.5 rounded-full" :class="riskClass(c.risk)">{{ c.risk }}</span>
              <span class="text-xs font-medium" :class="c.change1d >= 0 ? 'text-emerald-600' : 'text-red-500'">
                {{ c.change1d >= 0 ? '+' : '' }}{{ c.change1d }}% heute
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- ── VALUATIONS tab ── -->
    <div v-if="activeTab === 'valuations'" class="pt-4 space-y-4">
      <p class="text-xs text-gray-400">Stand: {{ val.lastUpdated }}</p>

      <!-- Sparkline bar chart -->
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm font-semibold text-gray-700 mb-3">AuM Verlauf (6 Monate)</p>
        <div class="flex items-end gap-2 h-24">
          <div
            v-for="h in val.history" :key="h.month"
            class="flex-1 flex flex-col items-center gap-1"
          >
            <div
              class="w-full rounded-t-md bg-brand-500 opacity-80 transition-all"
              :style="{ height: barHeight(h.value) + 'px' }"
            />
            <p class="text-xs text-gray-400">{{ h.month }}</p>
          </div>
        </div>
      </div>

      <!-- Per client -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <p class="text-sm font-semibold text-gray-700 px-4 pt-4 pb-2">Klienten</p>
        <div class="divide-y divide-gray-50">
          <div v-for="v in val.byClient" :key="v.clientId" class="flex items-center px-4 py-3 gap-3">
            <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600 flex-shrink-0">
              {{ v.name.split(' ').map((n:string) => n[0]).join('') }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ v.name }}</p>
              <p class="text-xs text-gray-400">Vorher: {{ fmt(v.prev) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-gray-900">{{ fmt(v.value) }}</p>
              <p class="text-xs font-medium" :class="v.change >= 0 ? 'text-emerald-600' : 'text-red-500'">
                {{ v.change >= 0 ? '+' : '' }}{{ v.change }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── CRM NOTES tab ── -->
    <div v-if="activeTab === 'crm'" class="pt-4 space-y-3">
      <div
        v-for="n in notes" :key="n.id"
        class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600 flex-shrink-0">
              {{ n.clientName.split(' ').map((x:string) => x[0]).join('') }}
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900 leading-tight">{{ n.clientName }}</p>
              <p class="text-xs text-gray-400">{{ n.advisor }} · {{ fmtDate(n.date) }}</p>
            </div>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full flex-shrink-0" :class="tagClass(n.tag)">{{ n.tag }}</span>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed">{{ n.text }}</p>
      </div>
    </div>

    <!-- ── CASHFLOW tab ── -->
    <div v-if="activeTab === 'cashflow'" class="pt-4 space-y-4">
      <div
        v-for="p in plans" :key="p.clientId"
        class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600">
              {{ p.initials }}
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">{{ p.clientName }}</p>
              <p class="text-xs text-gray-400">{{ p.goal }}</p>
            </div>
          </div>
          <span class="text-xs px-2 py-1 rounded-full font-medium" :class="p.onTrack ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'">
            {{ p.onTrack ? '✓ Im Plan' : '⚠ Lücke' }}
          </span>
        </div>

        <!-- Progress bar -->
        <div class="mb-3">
          <div class="flex justify-between text-xs text-gray-400 mb-1">
            <span>{{ fmt(p.currentValue) }}</span>
            <span>Ziel: {{ fmt(p.targetValue) }}</span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all"
              :class="p.onTrack ? 'bg-emerald-500' : 'bg-amber-400'"
              :style="{ width: Math.min(100, Math.round(p.currentValue / p.targetValue * 100)) + '%' }"
            />
          </div>
          <p class="text-xs text-gray-400 mt-1 text-right">
            {{ Math.round(p.currentValue / p.targetValue * 100) }}% · Prognose: {{ fmt(p.projectedValue) }}
          </p>
        </div>

        <!-- Mini bar chart -->
        <div class="flex items-end gap-1 h-14">
          <div
            v-for="y in p.years" :key="y.year"
            class="flex-1 flex flex-col items-center gap-0.5"
          >
            <div class="w-full flex items-end gap-0.5 h-10">
              <div
                class="flex-1 rounded-t-sm"
                :class="y.actual ? 'bg-brand-500' : 'bg-brand-100'"
                :style="{ height: cfBarHeight(y.actual ?? y.projected, p) + 'px' }"
              />
            </div>
            <p class="text-xs text-gray-400 leading-none">{{ y.year.slice(2) }}</p>
          </div>
        </div>
        <div class="flex gap-3 mt-2 text-xs text-gray-400">
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-sm bg-brand-500 inline-block"></span>Ist</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-sm bg-brand-100 inline-block"></span>Prognose</span>
          <span class="ml-auto">{{ fmt(p.monthlyContribution) }}/Monat</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const clients  = useClients()
const val      = useValuations()
const notes    = useCrmNotes()
const plans    = useCashflowPlans()

const tabs = [
  { id: 'clients',    label: 'Klienten' },
  { id: 'valuations', label: 'Bewertung' },
  { id: 'crm',        label: 'CRM' },
  { id: 'cashflow',   label: 'Cashflow' },
]
const activeTab = ref('clients')

const fmt = (v: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v)

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })

const riskClass = (r: string) => ({
  'Konservativ': 'bg-blue-50 text-blue-700',
  'Ausgewogen':  'bg-amber-50 text-amber-700',
  'Wachstum':    'bg-emerald-50 text-emerald-700',
}[r] ?? 'bg-gray-100 text-gray-600')

const tagClass = (t: string) => ({
  'Meeting':  'bg-blue-50 text-blue-700',
  'Telefon':  'bg-purple-50 text-purple-700',
  'E-Mail':   'bg-teal-50 text-teal-700',
  'Notiz':    'bg-gray-100 text-gray-600',
}[t] ?? 'bg-gray-100 text-gray-600')

// bar chart helpers
const maxVal = computed(() => Math.max(...val.history.map(h => h.value)))
const barHeight = (v: number) => Math.round((v / maxVal.value) * 80)

const cfBarHeight = (v: number, p: any) => {
  const max = Math.max(...p.years.map((y: any) => y.projected))
  return Math.round((v / max) * 36)
}
</script>
