// Obyekt kartasi ma'lumoti — etalon aktiv.html MALUMOT'idan. Rasm yo'llari
// public/bino ga moslangan. DRF bosqichida bitta obyekt endpointiga aylanadi.
export interface AktivKarta {
  nom: string; tur: string; holat: string; rasm: string
  manzil: string; maydon: string; yer: string; qavat: string; yil: string
  tavsif: string
  infra: { suv: string; gaz: string; elektr: string; kanal: string }
}

export const MALUMOT: Record<string, AktivKarta> = {
  'green-tower': { nom: 'Green Tower', tur: 'Biznes markazi', holat: 'Faol', rasm: '/bino/tower.png',
    manzil: "Toshkent shahri, Shayxontohur tumani, Amir Temur ko'chasi, 88",
    maydon: '18 500 m²', yer: '4 250 m²', qavat: '12', yil: '2022',
    tavsif: "Green Tower – zamonaviy biznes markazi bo'lib, 12 qavatdan iborat. Bino ofis maydonlari, konferensiya zallari, yerosti avtoturargohi va to'liq infratuzilma bilan ta'minlangan.",
    infra: { suv: "Shahar suv tarmog'idan — asosiy kirish yerto'lada", gaz: 'Markazlashtirilgan gaz yo\u02bcq — markaziy isitish/sovutish', elektr: '220/380V + zaxira generator', kanal: 'Shahar kanalizatsiya tarmog\u02bciga ulangan' } },
  'chorvoq-dacha': { nom: 'Chorvoq dacha', tur: 'Dacha', holat: 'Faol', rasm: '/bino/dacha.png',
    manzil: "Toshkent viloyati, Bo'stonliq tumani, Chorvoq qirg'og'i, 12",
    maydon: '850 m²', yer: '2 400 m²', qavat: '2', yil: '2019',
    tavsif: "Chorvoq suv ombori qirg'og'idagi dam olish uyi — mehmonxona bloki va bog' hududi bilan.",
    infra: { suv: 'Quduq + shahar tarmog\u02bci', gaz: 'Balon gaz', elektr: '220V', kanal: 'Mahalliy septik' } },
  'yashnobod-yer': { nom: 'Yashnobod yer maydoni', tur: 'Yer maydoni', holat: 'Rejalashtirilgan', rasm: '/bino/yer.png',
    manzil: 'Toshkent shahri, Yashnobod tumani, 7-mavze',
    maydon: '12 000 m²', yer: '12 000 m²', qavat: '—', yil: '—',
    tavsif: "Qurilish uchun ajratilgan bo'sh yer maydoni. Loyihalash bosqichida.",
    infra: { suv: 'Magistralga 120 m', gaz: 'Magistralga 200 m', elektr: 'Transformator yonida', kanal: 'Loyihada' } },
  'mega-mall': { nom: 'Mega Mall', tur: 'Savdo markazi', holat: 'Faol', rasm: '/bino/mall.png',
    manzil: "Toshkent shahri, Chilonzor tumani, Qatortol ko'chasi, 4",
    maydon: '32 400 m²', yer: '18 000 m²', qavat: '4', yil: '2020',
    tavsif: "Yirik savdo-ko'ngilochar markaz: 180 dan ortiq do'kon, food-court va kinoteatr.",
    infra: { suv: 'Shahar tarmog\u02bci', gaz: 'Markazlashtirilgan', elektr: '2 mustaqil kirish + generator', kanal: 'Shahar tarmog\u02bci' } },
  'nurafshon-turar': { nom: 'Nurafshon turar-joy majmuasi', tur: 'Turar-joy', holat: 'Faol', rasm: '/bino/turar.png',
    manzil: "Toshkent viloyati, Nurafshon shahri, Istiqlol ko'chasi, 21",
    maydon: '14 800 m²', yer: '9 600 m²', qavat: '9', yil: '2023',
    tavsif: '9 qavatli 4 blokdan iborat turar-joy majmuasi, yopiq hovli va bolalar maydonchasi bilan.',
    infra: { suv: 'Shahar tarmog\u02bci', gaz: 'Markazlashtirilgan', elektr: '220/380V', kanal: 'Shahar tarmog\u02bci' } },
  'humo-office': { nom: 'Humo Office', tur: 'Ofis', holat: 'Faol', rasm: '/bino/humo.png',
    manzil: "Toshkent shahri, Yakkasaroy tumani, Bobur ko'chasi, 40",
    maydon: '6 200 m²', yer: '1 800 m²', qavat: '6', yil: '2021',
    tavsif: 'B+ toifali ofis binosi — ochiq rejali qavatlar va yerosti avtoturargoh.',
    infra: { suv: 'Shahar tarmog\u02bci', gaz: 'Yo\u02bcq — markaziy isitish', elektr: '220/380V', kanal: 'Shahar tarmog\u02bci' } },
  'yakkasaroy-dm': { nom: 'Yakkasaroy DM', tur: 'Davlat muassasasi', holat: 'Faol', rasm: '/bino/dm.png',
    manzil: "Toshkent shahri, Yakkasaroy tumani, Mirzo Ulug'bek ko'chasi, 22",
    maydon: '4 100 m²', yer: '2 600 m²', qavat: '4', yil: '2018',
    tavsif: "Hududiy boshqaruv organi joylashgan ma'muriy bino — qabulxona, majlislar zali va arxiv bilan.",
    infra: { suv: 'Shahar tarmog\u02bci', gaz: 'Markaziy isitish', elektr: '220/380V + majburiy zaxira generator', kanal: 'Shahar tarmog\u02bci' } },
  'nurafshon-ofis': { nom: 'Nurafshon ofis', tur: 'Turar-joy / Ofis', holat: 'Faol', rasm: '/bino/ofis.png',
    manzil: "Toshkent viloyati, Nurafshon shahri, Amir Temur shoh ko'chasi, 8",
    maydon: '3 450 m²', yer: '1 200 m²', qavat: '5', yil: '2022',
    tavsif: "Yangi ma'muriy markazdagi zamonaviy ofis maydoni — ochiq rejali qavatlar.",
    infra: { suv: 'Shahar tarmog\u02bci', gaz: 'Mavjud, alohida hisoblagich', elektr: '220/380V', kanal: 'Shahar tarmog\u02bci' } }
}

export const QAVATLAR: [string, string][] = [
  ['5', 'Penthouse'], ['4', 'Ofis qavati'], ['3', 'Ofis qavati'], ['2', 'Savdo qavati'], ['1', 'Kirish va lobby']
]
export const GALEREYA: [string, string, string][] = [
  ['/gal/gal_ofis.png', 'Ofis qavat 5', '1200 m²'],
  ['/gal/gal_konf.png', 'Konferensiya zali', '150 m²'],
  ['/gal/gal_yer.png', 'Yer maydoni', '4 250 m²'],
  ['/gal/gal_uy.png', 'Yaqin atrofdagi uy', '850 m'],
  ['/gal/gal_gen.png', 'Zaxira generator', '250 kVA']
]
