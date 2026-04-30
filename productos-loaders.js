/**
 * productos-loader.js
 * 
 * Incluye este script en tu index de productos (la tienda).
 * Lee los productos guardados por el panel admin y los muestra.
 * 
 * USO EN TU HTML:
 *   1. Agrega un contenedor donde quieras mostrar los productos:
 *      <div id="productos-grid"></div>
 * 
 *   2. Incluye este script al final del <body>:
 *      <script src="productos-loader.js"></script>
 */

const STORAGE_KEY = 'suplementos_productos';

function cargarProductosTienda() {
  let productos = [];
  try {
    productos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    console.error('Error al cargar productos:', e);
  }

  const grid = document.getElementById('productos-grid');
  if (!grid) return;

  if (!productos.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:3rem; color:#888; font-size:15px;">
        Próximamente nuevos productos disponibles.
      </div>`;
    return;
  }

  grid.innerHTML = productos.map(p => `
    <div class="producto-card">
      <div class="producto-img-wrap">
        ${p.img
          ? `<img src="${p.img}" alt="${p.nombre}" class="producto-img" />`
          : `<div class="producto-img-placeholder">📦</div>`}
        <span class="producto-categoria">${p.categoria}</span>
      </div>
      <div class="producto-body">
        <h3 class="producto-nombre">${p.nombre}</h3>
        ${p.desc ? `<p class="producto-desc">${p.desc}</p>` : ''}
        <div class="producto-footer">
          <span class="producto-precio">S/. ${p.precio.toFixed(2)}</span>
          <button class="producto-btn" onclick="contactarProducto('${p.nombre}')">Pedir</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* Botón de contacto — personaliza el número de WhatsApp */
const WHATSAPP_NUMBER = '51999999999'; // <-- pon el número real aquí

function contactarProducto(nombre) {
  const msg = encodeURIComponent(`Hola, quiero información sobre: ${nombre}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

/* Estilos de las tarjetas — se inyectan automáticamente */
const estilosTienda = `
  #productos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;
  }
  .producto-card {
    background: #fff;
    border: 1px solid #e8e5de;
    border-radius: 14px;
    overflow: hidden;
    transition: transform .2s, box-shadow .2s;
  }
  .producto-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }
  .producto-img-wrap {
    position: relative;
    height: 180px;
    background: #f5f4f0;
  }
  .producto-img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .producto-img-placeholder {
    width: 100%; height: 100%; display: flex; align-items: center;
    justify-content: center; font-size: 48px;
  }
  .producto-categoria {
    position: absolute; top: 10px; left: 10px;
    background: rgba(255,255,255,0.92); color: #555;
    font-size: 11px; padding: 3px 9px; border-radius: 6px;
    font-family: inherit;
  }
  .producto-body { padding: 1rem; }
  .producto-nombre {
    font-size: 15px; font-weight: 600; margin-bottom: 6px;
    color: #1a1a18; line-height: 1.3;
  }
  .producto-desc {
    font-size: 13px; color: #777; margin-bottom: 12px;
    line-height: 1.5;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
  }
  .producto-footer {
    display: flex; align-items: center; justify-content: space-between;
  }
  .producto-precio {
    font-size: 18px; font-weight: 700; color: #1a1a18;
  }
  .producto-btn {
    padding: 7px 16px; background: #1a1a18; color: #fff;
    border: none; border-radius: 8px; font-size: 13px;
    cursor: pointer; font-family: inherit; font-weight: 500;
  }
  .producto-btn:hover { opacity: 0.82; }
`;

/* Inyectar estilos */
const styleTag = document.createElement('style');
styleTag.textContent = estilosTienda;
document.head.appendChild(styleTag);

/* Ejecutar al cargar la página */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', cargarProductosTienda);
} else {
  cargarProductosTienda();
}