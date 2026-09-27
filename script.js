document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  const themeBtn = document.getElementById("themeBtn");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filterValue = button.getAttribute("data-filter");
      productCards.forEach(card => {
        const category = card.getAttribute("data-category");
        card.classList.toggle("hidden", !(filterValue === "all" || category === filterValue));
      });
    });
  });

  themeBtn.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    if (currentTheme === "light") {
      document.body.removeAttribute("data-theme");
      themeBtn.textContent = "⚡";
    } else {
      document.body.setAttribute("data-theme", "light");
      themeBtn.textContent = "🌙";
    }
  });

  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.padding = "1rem 5%";
      navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.18)";
    } else {
      navbar.style.padding = "1.5rem 5%";
      navbar.style.boxShadow = "none";
    }
  });
});

const PROJECTS = {
  triplo: {title:"TRIPLO B", icon:"📱", type:"Site de vendas de tecnologia", desc:"Telemóveis, computadores e acessórios.", about:"O Triplo B foi pensado para apresentar produtos tecnológicos de forma moderna, organizada e fácil de consultar, aproximando a loja dos seus clientes.", features:["Catálogo de produtos","Computadores","Ofertas e destaques","Contacto para pedidos"]},
  yours: {title:"YOURS HOBE", icon:"🎬", type:"Plataforma multimédia", desc:"Filmes, séries, bonecos e música.", about:"O Yours Hobe reúne categorias de entretenimento numa interface dinâmica, com foco em navegação visual e organização de conteúdos.", features:["Filmes","Séries","Bonecos","Música"]},
  moaiwil: {title:"COLÉGIO MOAIWIL", icon:"🎓", type:"Software escolar • Java", desc:"Gestão de alunos, matrículas, professores e notas.", about:"O Colégio Moaiwil é um conceito de software local criado com Java para organizar processos académicos e apoiar a secretaria.", features:["Dashboard","Alunos","Notas e pautas","Matrículas"]},
  farmacia: {title:"FARMÁCIA CORAGEM", icon:"💊", type:"Software de farmácia • Java", desc:"Produtos, stock, vendas e relatórios.", about:"A Farmácia Coragem foi pensada para facilitar a gestão de produtos e stock, centralizando vendas e informações importantes num único sistema.", features:["Dashboard","Produtos","Stock","Vendas"]},
  padaria: {title:"PADARIA CORAGEM", icon:"🥖", type:"Software de padaria • Java", desc:"Produtos, vendas, stock e encomendas.", about:"A Padaria Coragem é uma solução local para apoiar a organização de produtos, vendas, stock e encomendas.", features:["Dashboard","Produtos","Vendas","Encomendas"]},
  oficina: {title:"OFICINA ARMÉNIO", icon:"🔧", type:"Site de oficina automóvel", desc:"Manutenção, diagnóstico e reparação.", about:"A Oficina Arménio apresenta os principais serviços de uma oficina de forma profissional e facilita o contacto e o agendamento.", features:["Página inicial","Serviços","Diagnóstico","Agendamento"]},
  global: {title:"GRUPO DA 12", icon:"🌍", type:"Projecto educativo", desc:"Um site sobre globalização.", about:"O Grupo da 12 foi criado para apresentar a globalização de forma visual, abordando conceito, impactos, oportunidades e desafios.", features:["Introdução","Conceito","Impactos","Desafios"]}
};
let activeProject=null, modalIndex=0;

function openProjectModal(key){
  activeProject=PROJECTS[key]; modalIndex=0;
  document.getElementById("modalIcon").textContent=activeProject.icon;
  document.getElementById("modalTitle").textContent=activeProject.title;
  document.getElementById("modalType").textContent=activeProject.type;
  document.getElementById("modalDescription").textContent=activeProject.desc;
  document.getElementById("modalAboutTitle").textContent=activeProject.title;
  document.getElementById("modalAbout").textContent=activeProject.about;
  document.getElementById("modalFeatures").innerHTML=activeProject.features.map((f,i)=>`<div><span>${String(i+1).padStart(2,"0")}</span><b>${f}</b></div>`).join("");
  const dots=document.getElementById("galleryDots");
  dots.innerHTML=[1,2,3,4].map((_,i)=>`<button class="${i===0?"active":""}" onclick="showModalImage(${i})"></button>`).join("");
  document.getElementById("modalWhats").href="https://wa.me/244933324172?text="+encodeURIComponent("Olá Yuri! Vi o projecto "+activeProject.title+" no seu portfólio e gostaria de saber mais.");
  showModalImage(0);
  const modal=document.getElementById("projectModal");
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
}
function closeProjectModal(){const modal=document.getElementById("projectModal"); modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.classList.remove("modal-open");}
function showModalImage(i){modalIndex=(i+4)%4; document.getElementById("modalImage").src=`imagens/project_${Object.keys(PROJECTS).find(k=>PROJECTS[k]===activeProject)}_${modalIndex+1}.svg`; document.querySelectorAll("#galleryDots button").forEach((b,j)=>b.classList.toggle("active",j===modalIndex));}
function modalNext(){showModalImage(modalIndex+1)}
function modalPrev(){showModalImage(modalIndex-1)}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProjectModal(); if(e.key==="ArrowRight"&&activeProject)modalNext(); if(e.key==="ArrowLeft"&&activeProject)modalPrev();});
