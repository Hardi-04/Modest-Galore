(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function _(e){return e?(e.startsWith("/")||(e=`/${e}`),e.replace(/\/+$/,"")||"/"):"/"}function B(e){if(e==="/"||e==="")return{re:/^\/$/,keys:[]};const t=[],n=e.split("/").filter(Boolean).map(a=>a.startsWith(":")?(t.push(a.slice(1)),"([^/]+)"):a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("/");return{re:new RegExp(`^/${n}$`),keys:t}}function Y({routes:e,onRouteChange:t}){const n=e.map(c=>({...c,_compiled:B(c.path)}));function s(c){c=_(c);for(const o of n){const r=c.match(o._compiled.re);if(!r)continue;const m={};return o._compiled.keys.forEach((d,p)=>{m[d]=decodeURIComponent(r[p+1])}),{route:o,params:m,pathname:c}}return null}function a(c){const o=new URL(c,window.location.origin);window.history.pushState({},"",o.pathname+o.search+o.hash),i()}function i(){const c=s(window.location.pathname),o=c?{pathname:c.pathname,params:c.params,query:new URLSearchParams(window.location.search),route:c.route}:{pathname:_(window.location.pathname),params:{},query:new URLSearchParams(window.location.search),route:null};t(o)}function l(){window.addEventListener("popstate",i),document.addEventListener("click",c=>{const o=c.target instanceof Element?c.target.closest("a"):null;if(!o||o.target&&o.target!=="_self"||o.hasAttribute("download"))return;const r=o.getAttribute("href");!r||r.startsWith("#")||r.startsWith("mailto:")||r.startsWith("tel:")||r.startsWith("http://")||r.startsWith("https://")||(c.preventDefault(),a(r))}),i()}return{start:l,navigate:a,match:s}}const W="mg_cart_v1";function A(){try{const e=window.localStorage.getItem(W);if(!e)return{};const t=JSON.parse(e);return!t||typeof t!="object"?{}:t}catch{return{}}}function q(e){window.localStorage.setItem(W,JSON.stringify(e))}function I(){return A()}function z(){const e=A();return Object.values(e).reduce((t,n)=>t+(Number(n)||0),0)}function K(e,t=1){const n=A(),s=Math.max(0,(Number(n[e])||0)+(Number(t)||0));n[e]=s,n[e]<=0&&delete n[e],q(n)}function V(e){const t=A();delete t[e],q(t)}function J(e,t){const n=A(),s=Math.max(0,Math.floor(Number(t)||0));s<=0?delete n[e]:n[e]=s,q(n)}const Q="http://localhost:3002/api",U="mg_admin_token_v1";async function X(e){try{const t=await fetch(`${Q}/admin/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!t.ok){const s=await t.json();throw new Error(s.error||"Login failed")}const n=await t.json();return localStorage.setItem(U,n.token),n}catch(t){throw console.error("Login error:",t),t}}function Z(){localStorage.removeItem(U)}function T(){return localStorage.getItem(U)}function ee(){const e=T();if(!e)return!1;try{const t=JSON.parse(atob(e.split(".")[1])),n=Date.now()/1e3;return t.exp>n}catch{return!1}}async function te(e){const t=e.route,n=t?.title??"Modest Galore";document.title=n;const s=z(),a=t?await t.render(e):ae();return`
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header class="header">
      <a href="/" class="logo" aria-label="Modest Galore">
        <span class="logo-icon" aria-hidden="true">▲</span>
        MODEST GALORE
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="/" data-nav="home">Home</a>
        <a href="/shop" data-nav="shop">Shop</a>
        <a href="/about" data-nav="about">About</a>
        <a href="/contact" data-nav="contact">Contact</a>
        ${ee()?'<a href="/admin" data-nav="admin">Admin</a>':""}
        <a href="/cart" data-nav="cart">Cart <span class="cart-pill" aria-label="${s} items in cart">${s}</span></a>
      </nav>
      <button type="button" class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="mobile-nav">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <main id="main-content" class="app-main">
      ${a}
      ${ne()}
    </main>
  `}function ae(){return'<section class="page"><div class="page-inner"><h1 class="section-title">Not found</h1></div></section>'}function ne(){return`
    <footer class="footer">
      <div class="footer-social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-icon footer-icon--ig">Instagram</a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">𝕏</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
        <a href="https://wa.me/233256459524" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="footer-icon footer-icon--wa">WhatsApp</a>
      </div>
      <p class="footer-copy">&copy; Modest Galore. All rights reserved.</p>
    </footer>
  `}function se(){return`
    <section id="hero" class="hero">
      <div class="hero-bg"></div>
      <div class="hero-inner">
        <div class="hero-content">
          <h1 class="hero-title">MODEST GALORE</h1>
          <p class="hero-tagline">Hey, we Make Modest Fashion for Everyday, Discover.</p>
          <div class="hero-buttons">
            <a href="/shop" class="btn btn-solid">Shop Now</a>
            <a href="#gallery" class="btn btn-outline">View Our Gallery</a>
          </div>
          <div class="hero-reviews">
            <div class="hero-avatars" aria-hidden="true">
              <span class="avatar"></span>
              <span class="avatar"></span>
              <span class="avatar"></span>
            </div>
            <p>1,230+ Happy Customer</p>
          </div>
        </div>
        <div class="hero-image-wrap">
          <img src="/images/hero.png" alt="Modest fashion" class="hero-image" />
          <span class="hero-badge">40% OFF</span>
        </div>
      </div>
    </section>

    <section id="about" class="about">
      <div class="about-inner">
        <div class="about-text-block">
          <h2 class="section-title">MODEST GALORE</h2>
          <p class="about-subtitle">Modest Women</p>
          <p class="about-text">We believe in beauty that doesn’t shout—grace that speaks softly. Modest Galore is for those who choose refinement over excess. Timeless modest wear for the modern soul.</p>
          <div class="about-lines" aria-hidden="true">
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="about-image-wrap">
          <img src="/images/da0e02115c4bc4936d139daf41e4df26.jpg" alt="About Modest Galore" class="about-image" />
        </div>
      </div>
    </section>

    <section id="categories" class="categories">
      <div class="categories-inner">
        <a href="/category/Everyday%20Abayas" class="category-card">
          <img src="/images/ba554afb0c2cdba91299e0a2000d7ab7.jpg" alt="Everyday Abayas" />
          <div class="category-overlay">
            <span class="category-name">EVERYDAY ABAYAS</span>
            <span class="category-watch"><span class="play-icon">▶</span> Shop</span>
          </div>
        </a>
        <a href="/category/Luxury%20Abayas" class="category-card">
          <img src="/images/fc6cf8a75b82482ff62243e9e3fafc51.jpg" alt="Luxury Abayas" />
          <div class="category-overlay">
            <span class="category-name">LUXURY ABAYAS</span>
            <span class="category-watch"><span class="play-icon">▶</span> Shop</span>
          </div>
        </a>
        <a href="/category/Eid%20Collection" class="category-card">
          <img src="/images/b6a9d67831eec9bdceeb21b9519703bc.jpg" alt="Eid Collection" />
          <div class="category-overlay">
            <span class="category-name">EID COLLECTION</span>
            <span class="category-watch"><span class="play-icon">▶</span> Shop</span>
          </div>
        </a>
        <a href="/category/New%20Arrivals" class="category-card">
          <img src="/images/d77e1257b3736c6ab9d8dc4e3888ef48.jpg" alt="New Arrivals" />
          <div class="category-overlay">
            <span class="category-name">NEW ARRIVALS</span>
            <span class="category-watch"><span class="play-icon">▶</span> Shop</span>
          </div>
        </a>
      </div>
    </section>

    <section id="reviews" class="reviews">
      <h2 class="section-title section-title--center">CUSTOMER REVIEW</h2>
      <div class="reviews-grid">
        <article class="review-card">
          <div class="review-avatar" aria-hidden="true"></div>
          <h3 class="review-name">Maria Khan</h3>
          <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <p class="review-text">This Text Will Show Your Text. This Text Will Show Your Text. This Text Will Show Your Text. That Was The Story.</p>
        </article>
        <article class="review-card">
          <div class="review-avatar" aria-hidden="true"></div>
          <h3 class="review-name">Maria Khan</h3>
          <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <p class="review-text">This Text Will Show Your Text. This Text Will Show Your Text. This Text Will Show Your Text. That Was The Story.</p>
        </article>
        <article class="review-card">
          <div class="review-avatar" aria-hidden="true"></div>
          <h3 class="review-name">Maria Khan</h3>
          <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <p class="review-text">This Text Will Show Your Text. This Text Will Show Your Text. This Text Will Show Your Text. That Was The Story.</p>
        </article>
      </div>
      <div class="reviews-cta">
        <a href="/about" class="btn btn-light-blue">Learn More</a>
      </div>
    </section>

    <section id="gallery" class="gallery">
      <h2 class="section-title">GALLERY</h2>
      <div class="gallery-grid">
        <div class="gallery-item gallery-item--large">
          <img src="/images/4fb9a5378b6b8f886d0784a7894261be.jpg" alt="Modest Galore collection" />
        </div>
        <div class="gallery-item">
          <img src="/images/da0e02115c4bc4936d139daf41e4df26.jpg" alt="Abaya style" />
        </div>
        <div class="gallery-item">
          <img src="/images/ba554afb0c2cdba91299e0a2000d7ab7.jpg" alt="Everyday abayas" />
        </div>
        <div class="gallery-item">
          <img src="/images/fc6cf8a75b82482ff62243e9e3fafc51.jpg" alt="Luxury abayas" />
        </div>
        <div class="gallery-item">
          <img src="/images/65d87207ba15ee741eba31a7dca18fe2.jpg" alt="Modest fashion" />
        </div>
      </div>
    </section>

    ${G()}
  `}function G(){return`
    <section id="contact" class="contact">
      <div class="contact-shape" aria-hidden="true"></div>
      <h2 class="contact-title">CONTACT</h2>
      <div class="contact-buttons">
        <a href="https://wa.me/233256459524" target="_blank" rel="noopener noreferrer" class="btn btn-contact">Message Us On Whatsapp</a>
        <a href="https://wa.me/233256459524" target="_blank" rel="noopener noreferrer" class="btn btn-contact">Contact Us</a>
      </div>
      <p class="muted" style="position:relative; z-index:1; max-width: 60ch; margin: 1.25rem auto 0;">
        We reply fastest on WhatsApp.
      </p>
    </section>
  `}const w="http://localhost:3002/api";async function E(){try{const e=await fetch(`${w}/products`);if(!e.ok)throw new Error("Failed to fetch products");return await e.json()}catch(e){return console.error("Error fetching products:",e),[]}}async function R(e){try{const t=await fetch(`${w}/products/${e}`);if(!t.ok){if(t.status===404)return null;throw new Error("Failed to fetch product")}return await t.json()}catch(t){return console.error("Error fetching product:",t),null}}async function ie(e,t){try{const n=!e.id,s=n?`${w}/products`:`${w}/products/${e.id}`,i=await fetch(s,{method:n?"POST":"PUT",headers:{"Content-Type":"application/json",...t&&{Authorization:`Bearer ${t}`}},body:JSON.stringify({name:e.name,price:e.price,category:e.category,image:e.image,description:e.description})});if(!i.ok){const l=await i.json();throw new Error(l.error||"Failed to save product")}return await i.json()}catch(n){throw console.error("Error saving product:",n),n}}async function re(e,t){try{const n=await fetch(`${w}/products/${e}`,{method:"DELETE",headers:{...t&&{Authorization:`Bearer ${t}`}}});if(!n.ok){const s=await n.json();throw new Error(s.error||"Failed to delete product")}return await n.json()}catch(n){throw console.error("Error deleting product:",n),n}}function oe(e){return`$${e.toFixed(2)}`}async function ce(e){const t=e.query.get("category"),n=await E(),s=t?n.filter(a=>a.category===t):n;return`
    <section class="page page--white">
      <div class="page-inner">
        <h1 class="section-title">Shop</h1>
        <p class="muted lead">${t?`Showing: <strong>${$(t)}</strong>`:"Browse our featured pieces."}</p>

        <div class="product-grid" role="list">
          ${s.map(a=>`
                <article class="product-card" role="listitem">
                  <a href="/product/${encodeURIComponent(a.id)}" aria-label="View ${L(a.name)}">
                    <img src="${a.image}" alt="${L(a.name)}" loading="lazy" />
                  </a>
                  <div class="product-card-body">
                    <h2 class="product-card-title">${$(a.name)}</h2>
                    <div class="product-card-meta">
                      <span>${$(a.category)}</span>
                      <span class="price">${oe(a.price)}</span>
                    </div>
                    <div class="row">
                      <a class="btn btn-outline" href="/product/${encodeURIComponent(a.id)}">Details</a>
                      <button class="btn btn-solid" type="button" data-action="add-to-cart" data-id="${L(a.id)}">Add to cart</button>
                    </div>
                  </div>
                </article>
              `).join("")}
        </div>
      </div>
    </section>
  `}function $(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function L(e){return $(e)}async function le(e){return H()?await ue(e):de()}function H(){return T()!==null}function de(){return`
    <section class="page page--white admin auth-page">
      <div class="page-inner admin-auth-inner">
        <div class="card admin-auth-card">
          <h1 class="section-title">Admin login</h1>
          <p class="muted">Enter the admin password to manage products.</p>
          <form data-admin-auth="form" class="admin-auth-form">
            <label class="admin-label" for="admin-password">Password</label>
            <input id="admin-password" class="admin-input" type="password" autocomplete="current-password" required />
            <button class="btn btn-solid admin-auth-btn" type="submit">Login</button>
            <p class="admin-auth-error muted" data-admin-auth="error" hidden>Incorrect password.</p>
          </form>
        </div>
      </div>
    </section>
  `}async function ue(e){const t=await E(),n=e.query.get("edit")||"",s=n?t.find(a=>a.id===n):null;return`
    <section class="page page--white admin">
      <div class="page-inner admin-layout">
        <aside class="admin-sidebar">
          <h2 class="admin-sidebar-title">Admin</h2>
          <nav class="admin-nav">
            <button class="admin-nav-link" type="button" data-admin-nav="products">Products</button>
            <button class="admin-nav-link" type="button" data-admin-nav="add">Add product</button>
          </nav>
          <button class="admin-logout" type="button" data-admin-action="logout">Log out</button>
        </aside>

        <div class="admin-main">
          <header class="admin-main-header">
            <div>
              <h1 class="section-title">Products</h1>
              <p class="muted">Manage items that appear in your shop and categories.</p>
            </div>
            <button class="btn btn-outline" type="button" data-admin-nav="add">+ Add product</button>
          </header>

          <section class="admin-grid">
            <div class="admin-panel">
              <div class="admin-panel-header">
                <h2>All products</h2>
                <input
                  type="search"
                  placeholder="Search by name or category"
                  class="admin-input admin-search"
                  data-admin-filter="search"
                />
              </div>
              <div class="admin-table" data-admin-products="table">
                ${t.map(a=>`
                      <article class="admin-row">
                        <div class="admin-row-main">
                          <img src="${a.image}" alt="${f(a.name)}" class="admin-row-img" />
                          <div>
                            <div class="admin-row-title">${S(a.name)}</div>
                            <div class="admin-row-sub muted">${S(a.category)} • $${Number(a.price).toFixed(2)}</div>
                          </div>
                        </div>
                        <div class="admin-row-actions">
                          <button class="btn btn-outline admin-row-btn" type="button" data-admin-edit="${f(a.id)}">Edit</button>
                          <button class="btn btn-danger admin-row-btn" type="button" data-admin-delete="${f(a.id)}">Delete</button>
                        </div>
                      </article>
                    `).join("")}
              </div>
            </div>

            <div class="admin-panel">
              <h2>${s?"Edit product":"Add product"}</h2>
              <form class="admin-form" data-admin-form="product">
                <input type="hidden" name="id" value="${s?f(s.id):""}" />

                <label class="admin-label">Name
                  <input class="admin-input" type="text" name="name" required value="${s?f(s.name):""}"/>
                </label>

                <label class="admin-label">Price (USD)
                  <input class="admin-input" type="number" step="0.01" min="0" name="price" required value="${s?f(s.price):""}"/>
                </label>

                <label class="admin-label">Category
                  <input class="admin-input" type="text" name="category" list="admin-categories" required value="${s?f(s.category):""}"/>
                </label>

                <label class="admin-label">Image URL
                  <input class="admin-input" type="text" name="image" placeholder="/images/..." value="${s?f(s.image):""}"/>
                </label>

                <label class="admin-label">Description
                  <textarea class="admin-input admin-textarea" name="description" rows="3">${s?S(s.description):""}</textarea>
                </label>

                <div class="admin-form-footer">
                  <button class="btn btn-solid" type="submit">${s?"Save changes":"Add product"}</button>
                  ${s?'<button class="btn btn-outline" type="button" data-admin-action="cancel-edit">Cancel</button>':""}
                </div>

                <div class="admin-image-preview" data-admin-image-preview>
                  ${s?`<img src="${f(s.image)}" alt="${f(s.name)}" /><span class="muted">Preview</span>`:'<span class="muted">Image preview will appear here.</span>'}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>

      <datalist id="admin-categories">
        <option value="Everyday Abayas"></option>
        <option value="Luxury Abayas"></option>
        <option value="Eid Collection"></option>
        <option value="New Arrivals"></option>
      </datalist>
    </section>
  `}async function me({rootEl:e,router:t,ctx:n}){const s=e.querySelector('[data-admin-auth="form"]');if(s instanceof HTMLFormElement){const r=e.querySelector('[data-admin-auth="error"]');s.addEventListener("submit",async m=>{m.preventDefault();const d=e.querySelector("#admin-password")?.value||"";try{await X(d),t.navigate("/admin")}catch(p){r&&(r.textContent=p.message,r.hidden=!1)}});return}if(!H())return;await E(),e.querySelectorAll("[data-admin-nav]").forEach(r=>{r.addEventListener("click",m=>{const d=(m.currentTarget||m.target).getAttribute("data-admin-nav");if(d==="add"){const p=new URL(window.location.href);p.searchParams.delete("edit"),t.navigate(p.pathname+p.search)}d==="products"&&t.navigate("/admin")})});const a=e.querySelector('[data-admin-action="logout"]');a&&a.addEventListener("click",()=>{Z(),t.navigate("/admin")});const i=e.querySelector('[data-admin-filter="search"]'),l=e.querySelector('[data-admin-products="table"]');i instanceof HTMLInputElement&&l&&i.addEventListener("input",()=>{const r=i.value.toLowerCase();l.querySelectorAll(".admin-row").forEach(m=>{const d=m.textContent?.toLowerCase()||"";m.style.display=d.includes(r)?"":"none"})}),e.querySelectorAll("[data-admin-edit]").forEach(r=>{r.addEventListener("click",()=>{const m=r.getAttribute("data-admin-edit");if(!m)return;const d=new URL(window.location.href);d.searchParams.set("edit",m),t.navigate(d.pathname+d.search)})}),e.querySelectorAll("[data-admin-delete]").forEach(r=>{r.addEventListener("click",async()=>{const m=r.getAttribute("data-admin-delete");if(m&&window.confirm("Remove this product?"))try{const d=T();await re(m,d),t.navigate("/admin")}catch(d){alert("Failed to delete product: "+d.message)}})});const c=e.querySelector('[data-admin-form="product"]');if(c instanceof HTMLFormElement){const r=c.querySelector('input[name="image"]'),m=e.querySelector("[data-admin-image-preview]");r instanceof HTMLInputElement&&m&&r.addEventListener("input",()=>{const d=r.value.trim();if(!d){m.innerHTML='<span class="muted">Image preview will appear here.</span>';return}m.innerHTML=`<img src="${f(d)}" alt="Preview" /><span class="muted">Preview</span>`}),c.addEventListener("submit",async d=>{d.preventDefault();const p=new FormData(c),h=T();try{const g=await ie({id:p.get("id")?.toString()||"",name:p.get("name")?.toString()||"",price:p.get("price")?.toString()||"",category:p.get("category")?.toString()||"",image:p.get("image")?.toString()||"",description:p.get("description")?.toString()||""},h),u=new URL(window.location.href);u.searchParams.set("edit",g.id),t.navigate(u.pathname+u.search)}catch(g){alert("Failed to save product: "+g.message)}})}const o=e.querySelector('[data-admin-action="cancel-edit"]');o&&o.addEventListener("click",()=>{const r=new URL(window.location.href);r.searchParams.delete("edit"),t.navigate(r.pathname+r.search)})}function S(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function f(e){return S(e)}async function pe(e){const t=e.params.name||"",n=decodeURIComponent(t),s=(await E()).filter(a=>a.category===n);return`
    <section class="page page--white">
      <div class="page-inner">
        <a href="/" class="muted" style="text-decoration:none;">← Back to home</a>
        <div class="spacer-sm"></div>
        <h1 class="section-title">${C(n)}</h1>
        <p class="muted lead">Choose from similar styles in this category.</p>

        ${s.length?`
              <div class="product-grid" role="list">
                ${s.map(a=>`
                      <article class="product-card" role="listitem">
                        <a href="/product/${encodeURIComponent(a.id)}" aria-label="View ${k(a.name)}">
                          <img src="${a.image}" alt="${k(a.name)}" loading="lazy" />
                        </a>
                        <div class="product-card-body">
                          <h2 class="product-card-title">${C(a.name)}</h2>
                          <div class="product-card-meta">
                            <span>${C(a.category)}</span>
                            <span class="price">$${Number(a.price).toFixed(2)}</span>
                          </div>
                          <div class="row">
                            <a class="btn btn-outline" href="/product/${encodeURIComponent(a.id)}">Details</a>
                            <button class="btn btn-solid" type="button" data-action="add-to-cart" data-id="${k(a.id)}">Add to cart</button>
                          </div>
                        </div>
                      </article>
                    `).join("")}
              </div>
            `:`
              <div class="card">
                <p style="margin:0;">No products found in this category yet.</p>
                <div class="spacer-md"></div>
                <a class="btn btn-solid" href="/shop">Go to shop</a>
              </div>
            `}
      </div>
    </section>
  `}function C(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function k(e){return C(e)}function he(e){return`$${e.toFixed(2)}`}async function ge(e){const t=await R(e.params.id);return t?`
    <section class="page page--white">
      <div class="page-inner">
        <a href="/shop" class="muted" style="text-decoration:none;">← Back to shop</a>
        <div class="spacer-sm"></div>
        <div class="product-detail">
          <img src="${t.image}" alt="${N(t.name)}" />
          <div class="card">
            <h1 class="section-title" style="margin-top:0;">${x(t.name)}</h1>
            <p class="muted" style="margin-top:0;">${x(t.category)}</p>
            <p style="font-size:1.15rem; margin: 0.75rem 0 1rem;"><span class="price">${he(t.price)}</span></p>
            <p class="muted" style="margin:0 0 1.25rem;">${x(t.description)}</p>
            <div class="row">
              <button class="btn btn-solid" type="button" data-action="add-to-cart" data-id="${N(t.id)}">Add to cart</button>
              <a class="btn btn-outline" href="/cart">Go to cart</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `:`
      <section class="page page--white">
        <div class="page-inner">
          <h1 class="section-title">Product not found</h1>
          <p class="muted">We couldn’t find that item.</p>
          <a class="btn btn-solid" href="/shop">Back to shop</a>
        </div>
      </section>
    `}function x(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function N(e){return x(e)}function O(e){return`$${e.toFixed(2)}`}async function fe(){const e=I(),n=(await Promise.all(Object.entries(e).map(async([a,i])=>({product:await R(a),qty:Number(i)||0})))).filter(a=>a.product&&a.qty>0),s=n.reduce((a,i)=>a+i.product.price*i.qty,0);return`
    <section class="page page--white">
      <div class="page-inner">
        <h1 class="section-title">Your cart</h1>
        <p class="muted">Cart state is saved in your browser (localStorage).</p>

        ${n.length===0?`
              <div class="card">
                <p style="margin:0;">Your cart is empty.</p>
                <div style="height: 1rem;"></div>
                <a class="btn btn-solid" href="/shop">Continue shopping</a>
              </div>
            `:`
              <div class="card cart-list">
                ${n.map(({product:a,qty:i})=>`
                      <div class="cart-item">
                        <img src="${a.image}" alt="${y(a.name)}" />
                        <div>
                          <h3>${P(a.name)}</h3>
                          <div class="muted">${P(a.category)} • <span class="price">${O(a.price)}</span></div>
                        </div>
                        <div class="cart-actions">
                          <label class="muted" style="font-size:0.9rem;" for="qty-${y(a.id)}">Qty</label>
                          <input id="qty-${y(a.id)}" class="qty-input" type="number" min="1" step="1" value="${i}" data-action="set-qty" data-id="${y(a.id)}" />
                          <button class="btn btn-danger" type="button" data-action="remove-from-cart" data-id="${y(a.id)}">Remove</button>
                        </div>
                      </div>
                    `).join("")}
              </div>

              <div style="height: 1rem;"></div>
              <div class="card" style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
                <div class="muted">Subtotal</div>
                <div style="font-size:1.1rem;"><span class="price">${O(s)}</span></div>
              </div>

              <div style="height: 1rem;"></div>
              <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                <a class="btn btn-outline" href="/shop">Add more items</a>
                <button class="btn btn-solid" type="button" data-action="checkout">Checkout</button>
              </div>
            `}
      </div>
    </section>
  `}function P(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function y(e){return P(e)}function ve(){return`
    <section class="page page--white">
      <div class="page-inner">
        <h1 class="section-title">About Modest Galore</h1>
        <p class="muted lead">
          We believe in beauty that doesn’t shout—grace that speaks softly. Modest Galore is for those who choose refinement over excess.
          We design timeless modest wear for the modern soul—pieces that feel effortless, refined, and made for everyday life.
        </p>

        <div class="spacer-lg"></div>
        <div class="product-detail">
          <img src="/images/da0e02115c4bc4936d139daf41e4df26.jpg" alt="Modest Galore style" />
          <div class="card">
            <h2 class="section-title" style="margin-top:0;">Our promise</h2>
            <ul class="muted" style="margin:0; padding-left: 1.2rem; display:grid; gap:0.5rem;">
              <li>Comfort-first cuts you can wear all day</li>
              <li>Elegant fabrics with a refined drape</li>
              <li>Thoughtful details without being loud</li>
              <li>Collections made for everyday and occasions</li>
            </ul>

            <div class="spacer-md"></div>
            <div class="row">
              <a class="btn btn-solid" href="/shop">Shop now</a>
              <a class="btn btn-outline" href="/contact">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function be(){return`
    ${G()}
  `}function ye(){return`
    <section class="page page--white">
      <div class="page-inner">
        <h1 class="section-title">Page not found</h1>
        <p class="muted">That link doesn’t exist.</p>
        <a class="btn btn-solid" href="/">Go home</a>
      </div>
    </section>
  `}const we=[{path:"/",title:"Modest Galore – Modest Fashion & Abayas",render:se},{path:"/shop",title:"Shop – Modest Galore",render:ce},{path:"/admin",title:"Admin – Modest Galore",render:le},{path:"/category/:name",title:"Category – Modest Galore",render:pe},{path:"/product/:id",title:"Product – Modest Galore",render:ge},{path:"/cart",title:"Cart – Modest Galore",render:fe},{path:"/about",title:"About – Modest Galore",render:ve},{path:"/contact",title:"Contact – Modest Galore",render:be},{path:"/404",title:"Not found – Modest Galore",render:ye}],Ae={},$e="233256459524",Se="+233256459524",Ce="shopwth_haajar",xe=(Ae?.VITE_PUBLIC_SITE_URL||"").trim();async function Te({rootEl:e,ctx:t,router:n}){e.__mgDelegatesAttached||(e.__mgDelegatesAttached=!0,e.addEventListener("click",async i=>{const l=i.target instanceof Element?i.target.closest("[data-action]"):null;if(!l)return;const c=l.getAttribute("data-action");if(c==="add-to-cart"){const o=l.getAttribute("data-id");if(!o)return;K(o,1),M(e),Ee(l);return}if(c==="remove-from-cart"){const o=l.getAttribute("data-id");if(!o)return;V(o),M(e),n.navigate("/cart");return}if(c==="checkout"){const o=I(),r=Object.keys(o).map(u=>R(u)),m=await Promise.all(r),d=Object.fromEntries(Object.keys(o).map((u,v)=>[u,m[v]])),p=Object.entries(o).map(([u,v])=>({product:d[u],qty:Number(v)||0})).filter(u=>u.product&&u.qty>0).map(({product:u,qty:v})=>({id:u.id,name:u.name,qty:v,image:u.image,imageUrl:j(u.image),productUrl:j(`/product/${encodeURIComponent(u.id)}`)})),h=p.map(u=>`- ${u.name} (Qty: ${u.qty})
${u.imageUrl}
${u.productUrl}`),g=`Hello, I want to buy these item(s):

`+(h.length?h.join(`
`):"(Cart is empty)")+`

Thank you.`;Le({rootEl:e,message:g,items:p});return}}),e.addEventListener("change",i=>{const l=i.target instanceof Element?i.target.closest("[data-action]"):null;if(!l)return;if(l.getAttribute("data-action")==="set-qty"&&l instanceof HTMLInputElement){const o=l.getAttribute("data-id"),r=Number(l.value);if(!o||!Number.isFinite(r))return;J(o,r),M(e),n.navigate("/cart")}}));const s=e.querySelector(".menu-btn"),a=e.querySelector(".nav");if(s&&a){const i=()=>{a.classList.remove("open"),s.setAttribute("aria-expanded","false")},l=()=>{const c=a.classList.toggle("open");s.setAttribute("aria-expanded",String(c))};s.addEventListener("click",l),a.querySelectorAll("a").forEach(c=>c.addEventListener("click",i))}if(!t.route&&t.pathname!=="/404"){n.navigate("/404");return}t.pathname==="/admin"&&me({rootEl:e,router:n,ctx:t})}function j(e){const t=String(e||"").trim();if(!t)return"";if(t.startsWith("http://")||t.startsWith("https://"))return t;const n=xe||window.location.origin;return new URL(t.startsWith("/")?t:`/${t}`,n).toString()}function M(e){const t=I(),n=Object.values(t).reduce((a,i)=>a+(Number(i)||0),0),s=e.querySelector(".cart-pill");s&&(s.textContent=String(n),s.setAttribute("aria-label",`${n} items in cart`))}function Ee(e){if(!(e instanceof HTMLElement))return;const t=e.textContent;e.textContent="Added",e.style.opacity="0.9",window.setTimeout(()=>{e.textContent=t||"Add to cart",e.style.opacity=""},900)}function Le({rootEl:e,message:t,items:n}){const s=e.querySelector('[data-modal="checkout-fallback"]');s&&s.remove();const a=`https://wa.me/${encodeURIComponent($e)}?text=${encodeURIComponent(t)}`,i=`https://ig.me/m/${encodeURIComponent(Ce)}`,l=`sms:${encodeURIComponent(Se)}?body=${encodeURIComponent(t)}`,c=Array.isArray(n)?n:[],o=c.slice(0,3),r=Math.max(0,c.length-o.length),m=c.length?`
      <div class="modal-items" role="list" aria-label="Order items">
        ${o.map(h=>`
              <div class="modal-item" role="listitem">
                <img class="modal-item-img" src="${b(h.image)}" alt="${b(h.name)}" />
                <div class="modal-item-body">
                  <div class="modal-item-name">${F(h.name)}</div>
                  <div class="modal-item-meta muted">Qty: ${Number(h.qty)||1}</div>
                  <button class="modal-item-link" type="button" data-action="open-image" data-src="${b(h.imageUrl)}" data-alt="${b(h.name)}">Open image</button>
                </div>
              </div>
            `).join("")}
        ${r?`<div class="modal-items-more muted">+ ${r} more item${r===1?"":"s"}</div>`:""}
      </div>
    `:"",d=document.createElement("div");d.setAttribute("data-modal","checkout-fallback"),d.className="modal-overlay",d.innerHTML=`
    <div class="modal" role="dialog" aria-modal="true" aria-label="Checkout options">
      <button class="modal-close" type="button" aria-label="Close" data-action="close-modal">✕</button>
      <h2 class="modal-title">Send your order</h2>
      <p class="muted modal-subtitle">Choose how you want to message the seller. Instagram doesn’t support auto-fill, so we’ll copy your message for you.</p>

      ${m}

      <div class="modal-actions">
        <a class="btn btn-solid" href="${a}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <button class="btn btn-outline" type="button" data-action="open-instagram">Instagram DM</button>
        <a class="btn btn-outline" href="${l}">SMS</a>
        <button class="btn btn-light-blue" type="button" data-action="copy-order-message">Copy message</button>
      </div>

      <details class="modal-details">
        <summary>Preview message</summary>
        <pre class="modal-pre"></pre>
      </details>
    </div>
  `;const p=d.querySelector(".modal-pre");p&&(p.textContent=t),d.addEventListener("click",async h=>{const g=h.target instanceof Element?h.target.closest("[data-action]"):null;if(!g){h.target===d&&d.remove();return}const u=g.getAttribute("data-action");if(u==="close-modal"){d.remove();return}if(u==="open-image"){const v=g.getAttribute("data-src")||"",D=g.getAttribute("data-alt")||"Product image";ke({rootEl:e,src:v,alt:D,dimSelector:'[data-modal="checkout-fallback"]'});return}if(u==="open-instagram"){try{await navigator.clipboard.writeText(t),g.textContent="Copied — opening…",window.setTimeout(()=>{g.textContent="Instagram DM",window.open(i,"_blank","noopener,noreferrer")},250)}catch{window.open(i,"_blank","noopener,noreferrer"),window.prompt("Copy this message, then paste in Instagram:",t)}return}if(u==="copy-order-message")try{await navigator.clipboard.writeText(t),g.textContent="Copied",window.setTimeout(()=>g.textContent="Copy message",900)}catch{window.prompt("Copy this message:",t)}}),document.addEventListener("keydown",h=>{h.key==="Escape"&&d.remove()},{once:!0}),e.appendChild(d)}function F(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function b(e){return F(e)}function ke({rootEl:e,src:t,alt:n,dimSelector:s}){if(!t)return;const a=document.querySelector('[data-modal="image-lightbox"]');a&&a.remove();const i=document.querySelector(s);i&&i.classList.add("is-dimmed");const l=document.createElement("div");l.setAttribute("data-modal","image-lightbox"),l.className="lightbox-overlay",l.innerHTML=`
    <div class="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="lightbox-close" type="button" aria-label="Close image" data-action="close-lightbox">✕</button>
      <img class="lightbox-img" src="${b(t)}" alt="${b(n)}" />
    </div>
  `;const c=()=>{l.remove(),i&&i.classList.remove("is-dimmed")};l.addEventListener("click",o=>{((o.target instanceof Element?o.target.closest("[data-action]"):null)?.getAttribute("data-action")==="close-lightbox"||o.target===l)&&c()}),document.addEventListener("keydown",o=>{o.key==="Escape"&&c()},{once:!0}),document.body.appendChild(l)}function Me(e){if(!e)throw new Error("Missing #app root element");const t=Y({routes:we,onRouteChange:async n=>{e.innerHTML=await te(n),await Te({rootEl:e,ctx:n,router:t}),window.scrollTo({top:0,behavior:"auto"})}});t.start()}Me(document.getElementById("app"));
