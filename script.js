

document.addEventListener('DOMContentLoaded', function () {
    const dots = document.getElementsByClassName('dot');
    const articleList = document.querySelector('.article-list');
    let currentSlide = 0;
    let articles = [];
  
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener('click', function () {
        showSlide(i);
      });
    }
  
     const fetchArticles = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/ed9c3f1d-f0af-46ce-999f-f342fb5423e2');
        const data = await response.json();
        articles = [...data.news, ...data.news, ...data.news].slice(0, 15);
        
        populateArticles(articles.slice(0, 5));

        showSlide(currentSlide);

        setInterval(() => {
          showNextSlide();
        }, 15000);

        setTimeout(() => {
          location.reload();
        }, 180000);
        
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
  
    const populateArticles = (articleSlice)=>{
      
      articleList.innerHTML = '';
      
      articleSlice.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `
          <h3 class="article-title">${article.title}</h3>
          <p class="article-body">${article.details}</p>
        `;
        articleList.appendChild(articleElement);
      });
    }
  
   
  
    const showSlide = (n) => {
      if (n < 0) {
        currentSlide = dots.length - 1;
      } else if (n >= dots.length) {
        currentSlide = 0;
      } else {
        currentSlide = n;
      }
  
  
      const startIndex = currentSlide * 5;
     
      populateArticles(articles.slice(startIndex, startIndex + 5));
  
     
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
      }
      dots[currentSlide].classList.add('active');
    }

    const showNextSlide = () => {
      showSlide(currentSlide + 1);
    }

    fetchArticles()
  });
  