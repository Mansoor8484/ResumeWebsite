function toggle(header) {
  const body = header.nextElementSibling;
  const isOpen = body.classList.contains('open');
  document.querySelectorAll('.exp-body.open').forEach(b => b.classList.remove('open'));
  if (!isOpen) body.classList.add('open');
}

document.addEventListener('DOMContentLoaded', () => {
  const firstHeader = document.querySelector('.exp-item .exp-header');
  if (firstHeader) firstHeader.click();
});
