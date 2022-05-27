module.exports = {
  content: [    
    "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}"
],
  theme: {
    screens: {
      'phone': '640px', // => @media (min-width: 640px) { ... }

      'tablet': '768px', // => @media (min-width: 768px) { ... }
      
      'laptop': '1024px', // => @media (min-width: 1024px) { ... }

      'desktop': '1280px', // => @media (min-width: 1280px) { ... }
    },
    fontWeight: {
      'extralight':100,
      'light':200,
      'normal':400,
      'semibold':600,
      'bold':700,
      'bolder':900,
    },
    extend: {
      colors:{
        'rezablack':'#343A40',
        'rezawhite':'#F0F0F0',
        'rezaprimary':'#FFAF40',
        'rezasecondary':'#7B2CFF'
      },
       fontFamily:{
         'pop':['Poppins', 'system-ui', 'sans-serif']
       },
       
    }
  },
  plugins: [
 
  ],
}
