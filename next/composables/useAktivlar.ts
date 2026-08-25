// Aktivlar reyestri — ma'lumot etalon aktivlar.html'dan ko'chirilgan (namuna,
// portfel 1 248 obyekt). DRF bosqichida bu composable API klientiga aylanadi.
export interface Aktiv {
  id: string; nom: string; kod: string; hudud: string; tur: string
  status: string; qiymat: string; ball: number; rasm: string
  manzil: string; hududToliq: string; maydon: string; sana: string
  moliya: { daromad: string; xarajat: string; soliq: string; sugurta: string }
  hujjatlar: [string, string][]
}

export const OBYEKTLAR: Aktiv[] = [
  { id: 'green-tower', nom: 'Green Tower', kod: 'GT-2024-001', hudud: "Toshkent sh.", tur: 'Biznes markazi',
    status: 'Faol', qiymat: "12 450 000 000 so'm", ball: 92, rasm: '/bino/tower.png',
    manzil: "Amir Temur ko'chasi, 88", hududToliq: 'Toshkent sh., Shayxontohur', maydon: '18 500 m²', sana: '2022-yil 15-iyun',
    moliya: { daromad: "1 240 000 000 so'm", xarajat: "310 000 000 so'm", soliq: "86 000 000 so'm", sugurta: 'Amalda' },
    hujjatlar: [['Texnik pasport.pdf', '2,4 MB'], ['Kadastr hujjati.pdf', '1,1 MB'], ['Ijara shartnomasi.pdf', '860 KB'], ['Baholash hisoboti.xlsx', '420 KB']] },
  { id: 'chorvoq-dacha', nom: 'Chorvoq dacha', kod: 'CH-2023-045', hudud: "Bo'stonliq tum.", tur: 'Dacha',
    status: 'Faol', qiymat: "1 850 000 000 so'm", ball: 81, rasm: '/bino/dacha.png',
    manzil: "Chorvoq qirg'og'i, 12", hududToliq: "Toshkent vil., Bo'stonliq", maydon: '850 m²', sana: '2019-yil 3-avgust',
    moliya: { daromad: "0 so'm", xarajat: "42 000 000 so'm", soliq: "9 500 000 so'm", sugurta: 'Amalda' },
    hujjatlar: [['Texnik pasport.pdf', '1,2 MB'], ['Kadastr hujjati.pdf', '640 KB'], ['Baholash hisoboti.xlsx', '280 KB']] },
  { id: 'yashnobod-yer', nom: 'Yashnobod yer maydoni', kod: 'YM-2024-078', hudud: 'Toshkent sh.', tur: 'Yer maydoni',
    status: 'Rejalashtirilgan', qiymat: "3 200 000 000 so'm", ball: 74, rasm: '/bino/yer.png',
    manzil: 'Yashnobod tumani, 7-mavze', hududToliq: 'Toshkent sh., Yashnobod', maydon: '12 000 m²', sana: '—',
    moliya: { daromad: "0 so'm", xarajat: "12 000 000 so'm", soliq: "24 000 000 so'm", sugurta: "Yo'q" },
    hujjatlar: [['Kadastr hujjati.pdf', '980 KB'], ['Yer tekshiruvi.pdf', '1,4 MB']] },
  { id: 'mega-mall', nom: 'Mega Mall', kod: 'MM-2022-013', hudud: 'Toshkent sh.', tur: 'Savdo markazi',
    status: 'Faol', qiymat: "25 600 000 000 so'm", ball: 89, rasm: '/bino/mall.png',
    manzil: "Qatortol ko'chasi, 4", hududToliq: 'Toshkent sh., Chilonzor', maydon: '32 400 m²', sana: '2020-yil 20-noyabr',
    moliya: { daromad: "3 850 000 000 so'm", xarajat: "980 000 000 so'm", soliq: "215 000 000 so'm", sugurta: 'Amalda' },
    hujjatlar: [['Texnik pasport.pdf', '3,1 MB'], ['Kadastr hujjati.pdf', '1,6 MB'], ['Ijara shartnomasi.pdf', '1,2 MB'], ["Yong'in xavfsizligi sertifikati.pdf", '540 KB'], ['Baholash hisoboti.xlsx', '610 KB']] },
  { id: 'nurafshon-turar', nom: 'Nurafshon turar-joy majmuasi', kod: 'NT-2023-067', hudud: 'Nurafshon sh.', tur: 'Turar-joy',
    status: 'Faol', qiymat: "18 900 000 000 so'm", ball: 86, rasm: '/bino/turar.png',
    manzil: "Istiqlol ko'chasi, 21", hududToliq: 'Toshkent vil., Nurafshon', maydon: '14 800 m²', sana: '2023-yil 1-mart',
    moliya: { daromad: "2 100 000 000 so'm", xarajat: "540 000 000 so'm", soliq: "128 000 000 so'm", sugurta: 'Amalda' },
    hujjatlar: [['Texnik pasport.pdf', '2,8 MB'], ['Kadastr hujjati.pdf', '1,3 MB'], ['Foydalanishga topshirish akti.pdf', '920 KB'], ['Baholash hisoboti.xlsx', '505 KB']] },
  { id: 'humo-office', nom: 'Humo Office', kod: 'HO-2023-021', hudud: 'Toshkent sh.', tur: 'Ofis',
    status: 'Faol', qiymat: "6 750 000 000 so'm", ball: 88, rasm: '/bino/humo.png',
    manzil: "Bobur ko'chasi, 40", hududToliq: 'Toshkent sh., Yakkasaroy', maydon: '6 200 m²', sana: '2021-yil 12-may',
    moliya: { daromad: "780 000 000 so'm", xarajat: "195 000 000 so'm", soliq: "54 000 000 so'm", sugurta: 'Amalda' },
    hujjatlar: [['Texnik pasport.pdf', '1,9 MB'], ['Kadastr hujjati.pdf', '870 KB'], ['Ijara shartnomasi.pdf', '610 KB']] }
]

export function useAktivlar() {
  const qidiruv = ref('')
  const hudud = ref('Barcha hududlar')
  const tur = ref('Barcha turlar')
  const status = ref('Barcha statuslar')

  const HUDUDLAR = ['Barcha hududlar', ...new Set(OBYEKTLAR.map(o => o.hudud))]
  const TURLAR = ['Barcha turlar', ...new Set(OBYEKTLAR.map(o => o.tur))]
  const STATUSLAR = ['Barcha statuslar', ...new Set(OBYEKTLAR.map(o => o.status))]

  const royxat = computed(() => {
    const q = qidiruv.value.trim().toLowerCase()
    return OBYEKTLAR.filter(o =>
      (!q || [o.nom, o.kod, o.manzil, o.tur].some(v => v.toLowerCase().includes(q))) &&
      (hudud.value === 'Barcha hududlar' || o.hudud === hudud.value) &&
      (tur.value === 'Barcha turlar' || o.tur === tur.value) &&
      (status.value === 'Barcha statuslar' || o.status === status.value)
    )
  })

  return { qidiruv, hudud, tur, status, HUDUDLAR, TURLAR, STATUSLAR, royxat }
}
