(async () => {
  try {
    const res = await fetch('posts/manifest.json', { cache: 'no-store' });
    const posts = await res.json();
    const ul = document.getElementById('post-list');
    if (!Array.isArray(posts) || posts.length === 0) { ul.innerHTML = '<li>No posts yet.</li>'; return; }
    posts.sort((a,b)=> (b.date||'').localeCompare(a.date||''));
    for (const p of posts) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="post.html?slug=${encodeURIComponent(p.slug)}">${p.title} — ${p.date||''}</a>`;
      ul.appendChild(li);
    }
  } catch (e) {
    document.getElementById('posts').insertAdjacentHTML('beforeend','<p>Failed to load posts.</p>');
    console.error(e);
  }
})();
