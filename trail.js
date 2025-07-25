
  const contentMap = {
    regulatory: {
      heading: 'Regulatory Excellence',
      text: "Maximize your asset's probability of success in a complex, competitive environment with comprehensive solutions that intelligently connect best-in-class insights, technology, and expertise."
    },
    experts: {
      heading: 'Dedicated Clinical Experts',
      text: "Abs Inc Biotech provides full-service clinical development solutions with specialized, dedicated teams."
    }
  };

  const buttons = document.querySelectorAll('.info-btn');
  const dynamicContent = document.getElementById('dynamic-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      const content = contentMap[key];
      dynamicContent.innerHTML = `
        <h3>${content.heading}</h3>
        <p>${content.text}</p>
      `;
    });
  });