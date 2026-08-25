import type { Config } from 'tailwindcss'
// Ranglar ../auga.css :root tokenlaridan ko'chirilgan — dizayn-tizim bitta.
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        kanvas: '#F7F7FA', karta: '#FFFFFF', chiziq: '#ECEEF1', kirish: '#E7E9ED',
        matn: { DEFAULT: '#1B1E22', 2: '#494F56', 3: '#5F6169', 4: '#71767E' },
        yashil: { DEFAULT: '#78C802', toq: '#69B000', fon: '#F1F9E4' },
        lime: '#B4DC3C',
        rol: {
          admin: '#22261F', rahbar: '#8A4BD8', operator: '#2F6BCF', texnik: '#1C8A82'
        }
      },
      fontFamily: { onest: ['Onest', 'system-ui', 'sans-serif'] },
      borderRadius: { katta: '20px', karta: '18px', ich: '16px', el: '12px' },
      boxShadow: {
        soya: '0 1px 2px rgba(23,26,31,.04), 0 6px 24px rgba(23,26,31,.05)',
        pin: '0 2px 6px rgba(23,26,31,.10), 0 8px 20px rgba(23,26,31,.10)'
      }
    }
  }
}
