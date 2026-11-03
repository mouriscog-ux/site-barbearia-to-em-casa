/* ===================================================================
   BARBEARIA TÔ EM CASA — INTERFACE DE AGENDAMENTO (WIZARD 4 ETAPAS)
   =================================================================== */

// Estado global do Agendamento
const bookingState = {
  step: 1,
  service: {
    id: 'corte-moderno',
    name: 'Corte Moderno & Fade',
    price: 'R$ 75,00',
    duration: '45 min'
  },
  barber: {
    id: 'qualquer',
    name: 'Primeiro barbeiro disponível',
    role: 'Atendimento ágil'
  },
  date: null,
  time: null,
  customer: {
    name: '',
    phone: '',
    notes: ''
  }
};

// Dados de Demonstração
const servicesData = [
  {
    id: 'corte-moderno',
    name: 'Corte Moderno & Fade',
    price: 'R$ 75,00',
    duration: '45 min',
    desc: 'Degradê na navalha, tesoura de precisão, lavagem e finalização com pomada matte.'
  },
  {
    id: 'barba-terapia',
    name: 'Barboterapia & Alinhamento',
    price: 'R$ 65,00',
    duration: '40 min',
    desc: 'Toalha quente com óleos essenciais, massagem facial, navalhete e balm calmante.'
  },
  {
    id: 'combo-to-em-casa',
    name: 'Combo Tô em Casa (Corte + Barba)',
    price: 'R$ 125,00',
    duration: '1h 15 min',
    desc: 'A experiência completa: corte personalizado, barboterapia relaxante e café/cerveja.'
  },
  {
    id: 'acabamento-pezinho',
    name: 'Acabamento & Pezinho',
    price: 'R$ 35,00',
    duration: '20 min',
    desc: 'Alinhamento dos contornos com navalha, sobrancelha na pinça e loção pós-barba.'
  },
  {
    id: 'spa-capilar',
    name: 'Spa Capilar & Relaxamento',
    price: 'R$ 90,00',
    duration: '50 min',
    desc: 'Esfoliação do couro cabeludo, hidratação profunda com ozonioterapia e massagem.'
  }
];

const barbersData = [
  {
    id: 'carlos-mendes',
    name: 'Carlos Mendes',
    role: 'Master Barber • Fade & Freestyle',
    experience: '8 anos de experiência',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'rafael-silva',
    name: 'Rafael Silva',
    role: 'Visagista & Especialista em Barba',
    experience: '10 anos de experiência',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'bruno-castro',
    name: 'Bruno Castro',
    role: 'Cortes Clássicos & Tesoura',
    experience: '6 anos de experiência',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'qualquer',
    name: 'Qualquer Barbeiro Disponível',
    role: 'Maior disponibilidade de horários',
    experience: 'Equipe de alto padrão',
    avatar: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=300&auto=format&fit=crop'
  }
];

const timeSlots = {
  manha: ['09:00', '09:45', '10:30', '11:15'],
  tarde: ['13:00', '13:45', '14:30', '15:15', '16:00', '16:45', '17:30'],
  noite: ['18:15', '19:00', '19:45']
};

document.addEventListener('DOMContentLoaded', () => {
  renderServicesSelection();
  renderBarbersSelection();
  initCalendarAndSlots();
  setupBookingNavigation();
  setupQuickBookButtons();
});

// 1. Renderiza Cards de Serviços na Etapa 1
function renderServicesSelection() {
  const container = document.getElementById('step-services-list');
  if (!container) return;

  container.innerHTML = servicesData.map(service => {
    const isSelected = bookingState.service?.id === service.id;
    return `
      <div class="selectable-card p-5 ${isSelected ? 'selected' : ''}" data-service-id="${service.id}">
        <div class="flex items-start justify-between mb-2">
          <h4 class="font-display font-bold text-lg text-white">${service.name}</h4>
          <span class="text-gold font-display font-bold text-lg">${service.price}</span>
        </div>
        <p class="text-sm text-zinc-400 mb-3">${service.desc}</p>
        <div class="flex items-center text-xs text-zinc-500 font-medium">
          <svg class="w-4 h-4 mr-1.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Duração estimada: ${service.duration}
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.selectable-card').forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = card.dataset.serviceId;
      const selected = servicesData.find(s => s.id === serviceId);
      if (selected) {
        bookingState.service = selected;
        container.querySelectorAll('.selectable-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      }
    });
  });
}

// 2. Renderiza Cards de Barbeiros na Etapa 2
function renderBarbersSelection() {
  const container = document.getElementById('step-barbers-list');
  if (!container) return;

  container.innerHTML = barbersData.map(barber => {
    const isSelected = bookingState.barber?.id === barber.id;
    return `
      <div class="selectable-card p-5 flex items-center space-x-4 ${isSelected ? 'selected' : ''}" data-barber-id="${barber.id}">
        <img src="${barber.avatar}" alt="${barber.name}" class="w-16 h-16 rounded-full object-cover border-2 border-zinc-700 flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <h4 class="font-display font-bold text-base text-white truncate">${barber.name}</h4>
          <p class="text-xs text-gold font-medium mb-1">${barber.role}</p>
          <p class="text-xs text-zinc-400">${barber.experience}</p>
        </div>
        <div class="selection-indicator">
          <div class="w-6 h-6 rounded-full border border-zinc-600 flex items-center justify-center">
            <div class="w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-gold' : 'bg-transparent'}"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.selectable-card').forEach(card => {
    card.addEventListener('click', () => {
      const barberId = card.dataset.barberId;
      const selected = barbersData.find(b => b.id === barberId);
      if (selected) {
        bookingState.barber = selected;
        container.querySelectorAll('.selectable-card').forEach(c => {
          c.classList.remove('selected');
          const dot = c.querySelector('.selection-indicator div div');
          if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-transparent';
        });
        card.classList.add('selected');
        const activeDot = card.querySelector('.selection-indicator div div');
        if (activeDot) activeDot.className = 'w-2.5 h-2.5 rounded-full bg-gold';
      }
    });
  });
}

// 3. Inicializa Calendário & Slots de Horário na Etapa 3
function initCalendarAndSlots() {
  const daysContainer = document.getElementById('calendar-days-container');
  const currentMonthLabel = document.getElementById('calendar-month-label');

  // Gerar os próximos 14 dias disponíveis (ignorando domingo ou segunda se fechado)
  const today = new Date();
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  if (currentMonthLabel) {
    currentMonthLabel.textContent = `${months[today.getMonth()]} ${today.getFullYear()}`;
  }

  if (daysContainer) {
    const daysHtml = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const dayOfWeek = date.getDay();
      const isSunday = dayOfWeek === 0; // Fechado domingo
      const isToday = i === 0;
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      // Default selection no primeiro dia útil
      if (!bookingState.date && !isSunday) {
        bookingState.date = formattedDate;
      }

      const isSelected = bookingState.date === formattedDate;

      daysHtml.push(`
        <button type="button" 
          class="cal-day-btn flex flex-col items-center justify-center p-2 rounded-xl border ${isSelected ? 'selected' : 'border-zinc-800 bg-zinc-900/60'}" 
          data-date="${formattedDate}" 
          ${isSunday ? 'disabled' : ''}>
          <span class="text-[10px] uppercase text-zinc-400 font-semibold mb-0.5">${weekDays[dayOfWeek]}</span>
          <span class="text-base font-bold text-white">${date.getDate()}</span>
        </button>
      `);
    }
    daysContainer.innerHTML = daysHtml.join('');

    daysContainer.querySelectorAll('.cal-day-btn:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        bookingState.date = btn.dataset.date;
        daysContainer.querySelectorAll('.cal-day-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }

  // Renderizar Horários
  renderTimeSlots();
}

function renderTimeSlots() {
  const container = document.getElementById('time-slots-container');
  if (!container) return;

  const periods = [
    { label: 'Manhã', slots: timeSlots.manha },
    { label: 'Tarde', slots: timeSlots.tarde },
    { label: 'Noite', slots: timeSlots.noite }
  ];

  container.innerHTML = periods.map(p => `
    <div class="mb-4">
      <h5 class="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-2">${p.label}</h5>
      <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
        ${p.slots.map(slot => `
          <button type="button" class="time-slot-btn ${bookingState.time === slot ? 'selected' : ''}" data-time="${slot}">
            ${slot}
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.time-slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bookingState.time = btn.dataset.time;
      container.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
}

// 4. Navegação entre Etapas
function setupBookingNavigation() {
  const btnNext = document.getElementById('booking-btn-next');
  const btnPrev = document.getElementById('booking-btn-prev');

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (validateStep(bookingState.step)) {
        goToStep(bookingState.step + 1);
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (bookingState.step > 1) {
        goToStep(bookingState.step - 1);
      }
    });
  }

  // Formulário Final de Confirmação
  const bookingForm = document.getElementById('booking-final-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFinalSubmission();
    });
  }
}

function validateStep(step) {
  if (step === 1) {
    if (!bookingState.service) {
      showToast('Por favor, selecione um serviço para continuar.');
      return false;
    }
    return true;
  }
  if (step === 2) {
    if (!bookingState.barber) {
      showToast('Por favor, selecione um profissional.');
      return false;
    }
    return true;
  }
  if (step === 3) {
    if (!bookingState.date || !bookingState.time) {
      showToast('Por favor, selecione uma data e um horário.');
      return false;
    }
    return true;
  }
  return true;
}

function goToStep(nextStep) {
  if (nextStep < 1 || nextStep > 4) return;

  // Atualizar visual dos steps indicators
  const stepItems = document.querySelectorAll('.step-item');
  stepItems.forEach((item, idx) => {
    const stepNumber = idx + 1;
    item.classList.remove('active', 'completed');
    if (stepNumber === nextStep) {
      item.classList.add('active');
    } else if (stepNumber < nextStep) {
      item.classList.add('completed');
    }
  });

  // Ocultar todas as telas e exibir a etapa atual
  document.querySelectorAll('.booking-step-content').forEach(content => {
    content.classList.add('hidden');
  });

  const currentContent = document.getElementById(`booking-step-${nextStep}`);
  if (currentContent) {
    currentContent.classList.remove('hidden');
  }

  // Atualizar botões de navegação
  const btnPrev = document.getElementById('booking-btn-prev');
  const btnNext = document.getElementById('booking-btn-next');
  const navContainer = document.getElementById('booking-nav-actions');

  if (btnPrev) {
    if (nextStep === 1) {
      btnPrev.classList.add('invisible');
    } else {
      btnPrev.classList.remove('invisible');
    }
  }

  if (nextStep === 4) {
    if (btnNext) btnNext.classList.add('hidden');
    renderSummaryPreview();
  } else {
    if (btnNext) btnNext.classList.remove('hidden');
  }

  bookingState.step = nextStep;
}

// 5. Renderizar Resumo na Etapa 4
function renderSummaryPreview() {
  const container = document.getElementById('booking-summary-box');
  if (!container) return;

  container.innerHTML = `
    <div class="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl mb-6">
      <h4 class="font-display font-bold text-gold text-sm tracking-wider uppercase mb-4 flex items-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Resumo do seu Agendamento
      </h4>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between border-b border-zinc-800/80 pb-2">
          <span class="text-zinc-400">Serviço:</span>
          <span class="font-semibold text-white text-right">${bookingState.service?.name}</span>
        </div>
        <div class="flex justify-between border-b border-zinc-800/80 pb-2">
          <span class="text-zinc-400">Profissional:</span>
          <span class="font-semibold text-white text-right">${bookingState.barber?.name}</span>
        </div>
        <div class="flex justify-between border-b border-zinc-800/80 pb-2">
          <span class="text-zinc-400">Data & Horário:</span>
          <span class="font-semibold text-gold text-right">${bookingState.date} às ${bookingState.time}</span>
        </div>
        <div class="flex justify-between pt-1 text-base">
          <span class="text-white font-medium">Investimento:</span>
          <span class="font-display font-bold text-gold">${bookingState.service?.price}</span>
        </div>
      </div>
    </div>
  `;
}

// 6. Submissão e Integração via WhatsApp
function handleFinalSubmission() {
  const nameInput = document.getElementById('client-name');
  const phoneInput = document.getElementById('client-phone');
  const notesInput = document.getElementById('client-notes');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const notes = notesInput ? notesInput.value.trim() : '';

  if (!name || !phone) {
    showToast('Por favor, informe seu nome e telefone WhatsApp.');
    return;
  }

  bookingState.customer = { name, phone, notes };

  // Mensagem personalizada para o WhatsApp da Barbearia
  const textMessage = `*AGENDAMENTO — BARBEARIA TÔ EM CASA*\n\n` +
    `Olá! Gostaria de confirmar meu agendamento:\n` +
    `✂️ *Serviço:* ${bookingState.service?.name} (${bookingState.service?.price})\n` +
    `💈 *Profissional:* ${bookingState.barber?.name}\n` +
    `📅 *Data:* ${bookingState.date}\n` +
    `⏰ *Horário:* ${bookingState.time}\n` +
    `👤 *Cliente:* ${bookingState.customer.name}\n` +
    `📱 *WhatsApp:* ${bookingState.customer.phone}\n` +
    (bookingState.customer.notes ? `📝 *Observação:* ${bookingState.customer.notes}\n` : '') +
    `\n_Por favor, confirme se este horário está disponível!_`;

  const encodedMessage = encodeURIComponent(textMessage);
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;

  // Exibir Modal de Confirmação com Sucesso
  const confirmationModal = document.getElementById('booking-success-modal');
  if (confirmationModal) {
    const waLink = document.getElementById('btn-confirm-whatsapp');
    if (waLink) {
      waLink.href = whatsappUrl;
      waLink.target = '_blank';
    }
    confirmationModal.classList.remove('hidden');
    confirmationModal.classList.add('flex');
  }

  showToast('Agendamento pré-reservado com sucesso! Redirecionando...');
}

// 7. Botões Rápidos nos Cards de Serviços e Barbeiros
function setupQuickBookButtons() {
  document.querySelectorAll('[data-book-service]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.dataset.bookService;
      const found = servicesData.find(s => s.id === serviceId);
      if (found) {
        bookingState.service = found;
        renderServicesSelection();
      }
      
      const agendamentoSection = document.getElementById('agendamento');
      if (agendamentoSection) {
        agendamentoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('[data-book-barber]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const barberId = btn.dataset.bookBarber;
      const found = barbersData.find(b => b.id === barberId);
      if (found) {
        bookingState.barber = found;
        renderBarbersSelection();
      }

      const agendamentoSection = document.getElementById('agendamento');
      if (agendamentoSection) {
        agendamentoSection.scrollIntoView({ behavior: 'smooth' });
        goToStep(2);
      }
    });
  });
}

// Helper para Toast
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.innerHTML = `
    <svg class="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span class="text-sm font-medium text-white">${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Reset do Agendamento
window.resetBookingFlow = function() {
  const confirmationModal = document.getElementById('booking-success-modal');
  if (confirmationModal) {
    confirmationModal.classList.add('hidden');
    confirmationModal.classList.remove('flex');
  }
  goToStep(1);
  const nameInput = document.getElementById('client-name');
  const phoneInput = document.getElementById('client-phone');
  const notesInput = document.getElementById('client-notes');
  if (nameInput) nameInput.value = '';
  if (phoneInput) phoneInput.value = '';
  if (notesInput) notesInput.value = '';
};
