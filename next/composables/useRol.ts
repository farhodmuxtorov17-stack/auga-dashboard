// Rol holati — prototipdagi auga.js bilan BIR XIL kalitlar va ruxsat jadvali.
// Haqiqiy avtorizatsiya keyingi bosqichda DRF'dan keladi; bu qatlam faqat UI uchun.
export const ROL_KALIT: Record<string, string> = {
  'Rahbar': 'rahbar', 'Operator': 'operator', 'Texnik xodim': 'texnik', 'Administrator': 'admin'
}
export const ROL_RUXSAT: Record<string, string[] | null> = {
  admin: null,
  rahbar: ['panel','aktivlar','shartnomalar','xaritalar','hisobotlar','hujjatlar','bildirishnomalar','monitoring','vazifalar','yer','sotuv','arxiv','sozlamalar'],
  operator: ['panel','aktivlar','shartnomalar','xaritalar','smart-access','hujjatlar','bildirishnomalar','monitoring','hodisalar','vazifalar','yer','sotuv','arxiv','sozlamalar'],
  texnik: ['panel','aktivlar','xaritalar','monitoring','hodisalar','xonalar','yer','bildirishnomalar','sozlamalar']
}
export const FOYD_ISM: Record<string, string> = {
  admin: 'Akmalov Laziz', rahbar: 'Yusupov Botir', operator: 'Nazarova Feruza', texnik: 'Rustamov Sanjar'
}
export const MENYU: [string, string, string][] = [
  ['panel', '/', 'Boshqaruv paneli'],
  ['aktivlar', '/aktivlar', 'Aktivlar'],
  ['shartnomalar', '/shartnomalar', 'Shartnomalar'],
  ['xaritalar', '/hududlar', 'Hududlar'],
  ['hisobotlar', '/hisobotlar', 'Hisobotlar'],
  ['smart-access', '/smart-access', 'Smart Access'],
  ['hujjatlar', '/hujjatlar', 'Hujjatlar markazi'],
  ['monitoring', '/monitoring', 'Monitoring markazi'],
  ['hodisalar', '/hodisalar', 'Hodisalar markazi'],
  ['vazifalar', '/vazifalar', 'Vazifalar va tasdiqlar'],
  ['yer', '/yer-maydonlari', 'Yer maydonlari'],
  ['sotuv', '/sotuv', 'Sotuv jarayoni'],
  ['arxiv', '/arxiv', 'Sotilganlar arxivi'],
  ['foydalanuvchilar', '/foydalanuvchilar', 'Foydalanuvchilar'],
  ['sozlamalar', '/sozlamalar', 'Sozlamalar']
]

export function useRol() {
  const rol = useState<string>('auga-rol', () => 'Administrator')
  if (import.meta.client) {
    const saqlangan = localStorage.getItem('auga-rol')
    if (saqlangan && saqlangan in ROL_KALIT) rol.value = saqlangan
  }
  const kalit = computed(() => ROL_KALIT[rol.value] ?? 'texnik')
  const ism = computed(() => FOYD_ISM[kalit.value])
  const inisial = computed(() => ism.value.split(' ').map(s => s[0]).join(''))
  const ruxsatlimi = (bolim: string) => {
    const r = ROL_RUXSAT[kalit.value]
    return !r || r.includes(bolim)
  }
  const menyu = computed(() => MENYU.filter(([id]) => ruxsatlimi(id)))
  const tanla = (yangi: string) => {
    if (!(yangi in ROL_KALIT)) return
    rol.value = yangi
    if (import.meta.client) localStorage.setItem('auga-rol', yangi)
  }
  return { rol, kalit, ism, inisial, menyu, ruxsatlimi, tanla }
}
