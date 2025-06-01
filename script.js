// Initialize current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Custom Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  if (window.innerWidth >= 1024) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});

document.addEventListener('mousedown', () => {
  cursor.style.width = '15px';
  cursor.style.height = '15px';
  cursor.style.borderWidth = '3px';
  cursor.style.borderColor = 'var(--primary-light)';
});

document.addEventListener('mouseup', () => {
  cursor.style.width = '20px';
  cursor.style.height = '20px';
  cursor.style.borderWidth = '2px';
  cursor.style.borderColor = 'var(--primary-color)';
});

// Links and buttons hover effect for cursor
const links = document.querySelectorAll('a, button, .filter-btn, .close-modal');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.borderWidth = '2px';
    cursor.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
  });
  
  link.addEventListener('mouseleave', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderWidth = '2px';
    cursor.style.backgroundColor = 'transparent';
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  
  const spans = menuToggle.querySelectorAll('span');
  if (mobileNav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile nav when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      
      // Animate skill bars if it's the about section
      if (entry.target.id === 'about') {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(skill => {
          skill.style.width = skill.style.width;
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.classList.add('opacity-0');
  observer.observe(section);
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.dataset.filter;
    
    // Show/hide portfolio items based on filter
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 200);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 200);
      }
    });
  });
});

// Modal functionality
const modal = document.querySelector('.project-modal');
const modalContent = document.querySelector('.modal-body');
const closeModal = document.querySelector('.close-modal');
const viewProjectButtons = document.querySelectorAll('.view-project');

// Sample project data (in a real project, this would come from a database or JSON file)
const projects = {
  "Echo Brand Identity": {
    title: "Echo Brand Identity",
    category: "Branding",
    client: "Echo Tech Solutions",
    description: "A complete rebranding project for Echo Tech Solutions, a leading software development company. The project included a new logo, color palette, typography, and various brand assets.",
    challenge: "The client needed a brand identity that reflected their innovative approach to technology while maintaining a professional and trustworthy appearance.",
    solution: "We developed a minimalist yet modern brand identity using a color palette that combines deep blues with vibrant accents. The logo incorporates sound wave elements to represent the 'Echo' name.",
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166",
      "https://images.unsplash.com/photo-1635405074683-561826b98f21",
      "https://images.unsplash.com/photo-1586717799252-bd134ad00e26"
    ]
  },
  "Horizon Magazine": {
    title: "Horizon Magazine",
    category: "Print Design",
    client: "Horizon Publishing",
    description: "A complete redesign of Horizon Magazine, a quarterly publication focused on travel and culture. The project included layout design, typography selection, and art direction.",
    challenge: "Revitalize a traditional print magazine to appeal to a younger demographic while maintaining its loyal reader base.",
    solution: "We introduced a more dynamic layout with varied column structures, integrated bold typography, and incorporated more white space for a contemporary feel.",
    images: [
      "https://images.unsplash.com/photo-1586902197503-e71026292412",
      "https://images.unsplash.com/photo-1574177556859-1362f72edbc6",
      "https://images.unsplash.com/photo-1576867757603-05b134ebc379"
    ]
  },
  // Add more project details as needed
};

// Open modal with project details
viewProjectButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    const projectTitle = button.closest('.portfolio-item').querySelector('h3').textContent;
    const project = projects[projectTitle];
    
    if (project) {
      modalContent.innerHTML = `
        <h2 class="text-3xl font-bold mb-3">${project.title}</h2>
        <p class="text-sm text-primary mb-6">${project.category}</p>
        
        <div class="project-images mb-6">
          ${project.images.map(img => `<img src="${img}" alt="${project.title}" class="mb-4 rounded">`).join('')}
        </div>
        
        <div class="project-details">
          <div class="mb-4">
            <h3 class="text-xl font-semibold mb-2">Client</h3>
            <p>${project.client}</p>
          </div>
          
          <div class="mb-4">
            <h3 class="text-xl font-semibold mb-2">Project Overview</h3>
            <p>${project.description}</p>
          </div>
          
          <div class="mb-4">
            <h3 class="text-xl font-semibold mb-2">Challenge</h3>
            <p>${project.challenge}</p>
          </div>
          
          <div class="mb-4">
            <h3 class="text-xl font-semibold mb-2">Solution</h3>
            <p>${project.solution}</p>
          </div>
        </div>
      `;
      
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside of content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to your server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message (in a real app, do this after server confirmation)
    alert('Thank you! Your message has been sent. I will get back to you soon.');
    
    // Clear the form
    contactForm.reset();
  });
}

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});