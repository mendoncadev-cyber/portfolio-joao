import { useEffect, useRef, useState } from "react";
import "./App.css";

/* ------------------------------------------------------------------ */
/*  CONFIGURAÇÃO — preencha antes de publicar.                         */
/*  Links vazios ficam ocultos automaticamente (nada de link quebrado). */
/* ------------------------------------------------------------------ */
const LINKEDIN_URL = "https://www.linkedin.com/in/jo%C3%A3o-gabriel-21173b435/";
const GITHUB_URL = ""; // ex.: "https://github.com/seu-usuario"
const EMAIL = ""; // ex.: "voce@email.com"

const NAV = [
  { id: "sobre", label: "Sobre" },
  { id: "stack", label: "Stack" },
  { id: "insights", label: "Insights" },
  { id: "processo", label: "Processo" },
  { id: "contato", label: "Contato" },
];

const insights = [
  {
    id: "conecta-cuidado",
    titulo: "Conecta Cuidado",
    categoria: "Tecnologia e impacto social",
    insight: "Achar um cuidador não é falta de opção. É falta de organização.",
    observacao:
      "Famílias que procuram um cuidador de idosos lidam com informações espalhadas e quase nenhuma forma de comparar opções com segurança.",
    ideia:
      "Reunir a busca em um só lugar: perfis claros, comparação simples e um caminho que passe confiança em um momento delicado.",
    construido:
      "Plataforma web em React que aproxima famílias e cuidadores, organizando a descoberta de profissionais.",
    tecnologias: ["React", "JavaScript", "CSS"],
    status: "Em evolução",
    accent: "care",
  },
  {
    id: "biblioteca-livre",
    titulo: "Biblioteca Livre",
    categoria: "Web e API",
    insight: "Conteúdo educacional existe de sobra. O difícil é chegar até ele.",
    observacao:
      "Livros didáticos e materiais de estudo ficam espalhados, e encontrar o certo na hora certa vira uma tarefa por si só.",
    ideia:
      "Uma interface direta que busca, consulta e organiza o conteúdo que já existe, sem ruído e sem cadastro complicado.",
    construido:
      "Biblioteca digital em React que consome uma API para pesquisar e organizar livros didáticos.",
    tecnologias: ["React", "JavaScript", "API"],
    status: "Em evolução",
    accent: "library",
  },
  {
    id: "destrava-dividas",
    titulo: "Destrava Dívidas",
    categoria: "Finanças e UX",
    insight: "Dívida que não se enxerga não se resolve. Visualizada, vira plano.",
    observacao:
      "Com as dívidas soltas em números e datas, fica difícil saber o que pagar primeiro e qual é o próximo passo.",
    ideia:
      "Transformar números soltos em uma visão clara: prioridades, valores e um caminho de quitação que dá para acompanhar.",
    construido:
      "Aplicação em React para visualizar dívidas, organizar pagamentos e entender o caminho até a quitação.",
    tecnologias: ["React", "JavaScript", "CSS"],
    status: "Em evolução",
    accent: "finance",
  },
];

const stack = [
  { grupo: "Construo com", itens: ["React", "JavaScript", "HTML5", "CSS3", "Vite"] },
  { grupo: "Estudando agora", itens: ["Cibersegurança", "Inteligência Artificial", "APIs", "Git e GitHub"] },
];

const interesses = [
  {
    icon: "code",
    titulo: "Desenvolvimento web",
    texto: "Aplicações modernas e responsivas, com foco em uma experiência clara para quem usa.",
  },
  {
    icon: "shield",
    titulo: "Cibersegurança",
    texto: "Redes, segurança da informação e vulnerabilidades: o caminho para construir aplicações mais seguras.",
  },
  {
    icon: "brain",
    titulo: "Inteligência artificial",
    texto: "APIs, automações e aplicações de IA para entender como resolver problemas reais.",
  },
];

const processo = [
  ["01", "Observar", "Entendo o problema, quem sofre com ele e por que ele importa."],
  ["02", "Ter a ideia", "Procuro a solução mais simples que resolve de verdade."],
  ["03", "Construir", "Transformo a ideia em uma interface funcional e responsiva."],
  ["04", "Melhorar", "Testo, corrijo e evoluo o projeto a cada versão."],
];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    github: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.7-1.6 6.7-7A5.4 5.4 0 0 0 19.2 4 5 5 0 0 0 19.1.5S17.9.1 15 2.1a13.4 13.4 0 0 0-6 0C6.1.1 4.9.5 4.9.5A5 5 0 0 0 4.8 4 5.4 5.4 0 0 0 3.3 7.5c0 5.4 3.4 6.6 6.7 7A4.8 4.8 0 0 0 9 18v4" />
        <path d="M9 18c-4.5 2-5-2-7-2" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 11v6" />
        <path d="M8 8v.01" />
        <path d="M12 17v-3.2a2.4 2.4 0 0 1 4.8 0V17" />
        <path d="M12 11v6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
    moon: <path d="M20.7 15.2A8.9 8.9 0 0 1 8.8 3.3 9 9 0 1 0 20.7 15.2Z" />,
    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    brain: (
      <>
        <path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v.5A3.5 3.5 0 0 0 4.5 15 3.5 3.5 0 0 0 8 18.5h1.5" />
        <path d="M14.5 4.5A3.5 3.5 0 0 1 18 8v.5a3.5 3.5 0 0 1 1.5 6.5 3.5 3.5 0 0 1-3.5 3.5h-1.5" />
        <path d="M9.5 4.5v15M14.5 4.5v15M9.5 9h5M9.5 14h5" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 18h6" />
        <path d="M10 21.5h4" />
        <path d="M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.5.4.8 1 .8 1.7h6c0-.7.3-1.3.8-1.7A6.5 6.5 0 0 0 12 2.5Z" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function DevCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduce) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let codeX = mouseX;
    let codeY = mouseY;
    let frame;

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      codeX += (mouseX - codeX) * 0.16;
      codeY += (mouseY - codeY) * 0.16;

      if (glowRef.current) glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      if (codeRef.current) codeRef.current.style.transform = `translate3d(${codeX}px, ${codeY}px, 0)`;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={codeRef} className="dev-cursor" aria-hidden="true">
        <span className="dev-cursor-icon">&lt;/&gt;</span>
        <span className="dev-cursor-label">dev</span>
      </div>
      <div ref={cursorRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

/* Abertura: duas barras de cinema se abrem uma única vez por sessão. */
function Curtain() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem("intro-vista");
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem("intro-vista", "1");
      } catch {
        /* sem storage: tudo bem */
      }
      setVisible(false);
    }, 2300);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="curtain" aria-hidden="true">
      <div className="curtain-bar curtain-top" />
      <div className="curtain-bar curtain-bottom" />
      <span className="curtain-mark">João Gabriel</span>
    </div>
  );
}

function InsightVisual({ accent, titulo }) {
  return (
    <div className={`insight-visual ${accent}`}>
      <div className="browser-bar">
        <span />
        <span />
        <span />
        <small>{titulo.toLowerCase().replaceAll(" ", "-")}.app</small>
      </div>

      <div className="visual-content">
        {accent === "care" && (
          <>
            <div className="visual-avatar">CC</div>
            <div className="visual-lines">
              <i />
              <i />
              <i />
            </div>
          </>
        )}

        {accent === "library" && (
          <div className="book-stack">
            <span>web</span>
            <span>api</span>
            <span>leitura</span>
          </div>
        )}

        {accent === "finance" && (
          <>
            <div className="finance-value">R$ 2.450</div>
            <div className="finance-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("tema") !== "light";
    } catch {
      return true;
    }
  });
  const [menuAberto, setMenuAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);
  const [secaoAtiva, setSecaoAtiva] = useState("");
  const tabRefs = useRef([]);

  useEffect(() => {
    try {
      localStorage.setItem("tema", darkMode ? "dark" : "light");
    } catch {
      /* sem storage: tudo bem */
    }
  }, [darkMode]);

  useEffect(() => {
    const alvos = NAV.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!alvos.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setSecaoAtiva(entrada.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    alvos.forEach((alvo) => observer.observe(alvo));
    return () => observer.disconnect();
  }, []);

  const fecharMenu = () => setMenuAberto(false);

  const teclaNasTabs = (event) => {
    const total = insights.length;
    const mapa = {
      ArrowDown: (ativo + 1) % total,
      ArrowRight: (ativo + 1) % total,
      ArrowUp: (ativo - 1 + total) % total,
      ArrowLeft: (ativo - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    if (!(event.key in mapa)) return;
    event.preventDefault();
    const proximo = mapa[event.key];
    setAtivo(proximo);
    tabRefs.current[proximo]?.focus();
  };

  const atual = insights[ativo];

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Curtain />
      <DevCursor />

      <header className="navbar">
        <a href="#inicio" className="logo" onClick={fecharMenu} aria-label="João Gabriel - início">
          <span>&lt;</span>JG<span>/&gt;</span>
        </a>

        <nav
          id="menu-principal"
          className={menuAberto ? "nav-links active" : "nav-links"}
          aria-label="Navegação principal"
        >
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={fecharMenu}
              aria-current={secaoAtiva === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="theme-button"
            onClick={() => setDarkMode((value) => !value)}
            aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            title={darkMode ? "Modo claro" : "Modo escuro"}
          >
            <Icon name={darkMode ? "sun" : "moon"} size={18} />
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuAberto((value) => !value)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
          >
            <Icon name={menuAberto ? "close" : "menu"} size={20} />
          </button>
        </div>
      </header>

      <main>
        {/* HERO ------------------------------------------------------ */}
        <section className="hero" id="inicio">
          <div className="hero-beam" aria-hidden="true" />

          <div className="hero-copy">
            <p className="availability">
              <span className="status-dot" />
              Construindo, aprendendo e evoluindo.
            </p>

            <h1 className="hero-title">
              <span className="title-line">
                <span>Você imagina.</span>
              </span>
              <span className="title-line title-second">
                <span>Eu dou vida.</span>
              </span>
            </h1>

            <p className="hero-text">
              Sou <strong>João Gabriel</strong>, estudante de Informática para Internet e
              desenvolvedor web em formação. Antes de escrever código, procuro o insight por trás
              da ideia. Depois, construo com <strong>React, JavaScript, HTML, CSS e Vite</strong>.
            </p>

            <div className="hero-buttons">
              <a href="#insights" className="button primary">
                Ver os insights <Icon name="arrow" size={17} />
              </a>
              <a href="#contato" className="button secondary">
                Vamos conversar
              </a>
            </div>

            <div className="social-row" aria-label="Redes e contato">
              {LINKEDIN_URL && (
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="social-link">
                  <Icon name="linkedin" size={18} />
                  <span>LinkedIn</span>
                </a>
              )}
              {GITHUB_URL && (
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="social-link">
                  <Icon name="github" size={18} />
                  <span>GitHub</span>
                </a>
              )}
              {EMAIL && (
                <a href={`mailto:${EMAIL}`} className="social-link">
                  <Icon name="mail" size={18} />
                  <span>E-mail</span>
                </a>
              )}
            </div>
          </div>

          <figure className="hero-still">
            <div className="still-frame">
              <img src="/foto-perfil.jpg" alt="João Gabriel sorrindo, de blazer azul" className="profile-photo" />
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />
            </div>
            <figcaption>
              <strong>João Gabriel</strong>
              <span>Último período do Técnico em Informática para Internet</span>
            </figcaption>
          </figure>
        </section>

        {/* SOBRE ----------------------------------------------------- */}
        <section className="section about" id="sobre">
          <div className="wrap">
            <div className="section-heading">
              <h2>Eu começo antes do código.</h2>
            </div>

            <div className="about-grid">
              <div className="about-copy">
                <p>
                  Sou estudante do último período do curso técnico em Informática para Internet e
                  construo minha experiência na prática, criando projetos próprios e transformando
                  ideias em aplicações reais.
                </p>
                <p>
                  Meu trabalho começa pela ideia, pelo problema e por quem vai usar a solução. Só
                  então desenvolvo interfaces modernas, funcionais e responsivas.
                </p>
                <p>
                  Também aprofundo meus estudos em <strong>cibersegurança</strong> e{" "}
                  <strong>inteligência artificial</strong>, para criar produtos cada vez mais
                  completos, úteis e seguros.
                </p>
              </div>

              <dl className="facts">
                <div>
                  <dt>Formação</dt>
                  <dd>Técnico em Informática para Internet, último período</dd>
                </div>
                <div>
                  <dt>Foco atual</dt>
                  <dd>Desenvolvimento web com React</dd>
                </div>
                <div>
                  <dt>Em estudo</dt>
                  <dd>Cibersegurança e inteligência artificial</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* STACK ----------------------------------------------------- */}
        <section className="section stack-section" id="stack">
          <div className="wrap">
            <div className="section-heading">
              <h2>As ferramentas que dão forma às ideias.</h2>
              <p className="section-lead">
                Minha stack evolui junto com o meu aprendizado, sempre com foco em soluções
                práticas.
              </p>
            </div>

            <div className="stack-list">
              {stack.map((grupo) => (
                <div className="stack-group" key={grupo.grupo}>
                  <h3>{grupo.grupo}</h3>
                  <ul>
                    {grupo.itens.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="interests">
              {interesses.map((item) => (
                <article className="interest" key={item.titulo}>
                  <span className="interest-icon">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INSIGHTS -------------------------------------------------- */}
        <section className="section insights" id="insights">
          <div className="wrap">
            <div className="section-heading insights-heading">
              <h2>Toda boa ideia começa com uma observação.</h2>
              <p className="section-lead">
                Antes de abrir o editor, eu procuro o insight: o que incomoda, por que incomoda e
                qual a ideia mais simples que resolve. Estes são os insights por trás dos meus
                projetos.
              </p>
            </div>

            <div className="insights-stage">
              <div
                className="insight-tabs"
                role="tablist"
                aria-label="Insights por projeto"
                aria-orientation="vertical"
                onKeyDown={teclaNasTabs}
              >
                {insights.map((item, index) => (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={ativo === index}
                    aria-controls="insight-panel"
                    tabIndex={ativo === index ? 0 : -1}
                    className="insight-tab"
                    onClick={() => setAtivo(index)}
                  >
                    <span className="tab-name">{item.titulo}</span>
                    <span className="tab-area">{item.categoria}</span>
                  </button>
                ))}
              </div>

              <div
                className="insight-panel"
                role="tabpanel"
                id="insight-panel"
                aria-labelledby={`tab-${atual.id}`}
                key={atual.id}
              >
                <InsightVisual accent={atual.accent} titulo={atual.titulo} />

                <blockquote className="insight-quote">
                  <Icon name="bulb" size={26} />
                  <p>{atual.insight}</p>
                </blockquote>

                <ol className="insight-flow">
                  <li>
                    <h3>Observação</h3>
                    <p>{atual.observacao}</p>
                  </li>
                  <li>
                    <h3>Ideia</h3>
                    <p>{atual.ideia}</p>
                  </li>
                  <li>
                    <h3>O que construí</h3>
                    <p>{atual.construido}</p>
                  </li>
                </ol>

                <div className="insight-foot">
                  <ul className="project-tags">
                    {atual.tecnologias.map((tecnologia) => (
                      <li key={tecnologia}>{tecnologia}</li>
                    ))}
                  </ul>
                  <span className="status-tag">{atual.status}</span>
                </div>
              </div>
            </div>

            <p className="insights-note">
              Este portfólio evolui junto comigo. Novos insights e projetos entram conforme eu
              aprendo, e links de demonstração e código aparecem assim que estiverem publicados.
            </p>
          </div>
        </section>

        {/* PROCESSO -------------------------------------------------- */}
        <section className="section process" id="processo">
          <div className="wrap">
            <div className="section-heading">
              <h2>Da observação ao produto.</h2>
            </div>

            <ol className="process-grid">
              {processo.map(([numero, titulo, texto]) => (
                <li key={numero} className="process-item">
                  <span className="process-number">{numero}</span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTATO --------------------------------------------------- */}
        <section className="contact" id="contato">
          <div className="wrap contact-inner">
            <div>
              <h2>
                Tem uma ideia?
                <br />
                Vamos construir.
              </h2>
              <p className="contact-text">
                Estou aberto a conversar sobre projetos, tecnologia, aprendizado e oportunidades na
                área.
              </p>
            </div>

            <div className="contact-actions">
              {EMAIL && (
                <a href={`mailto:${EMAIL}`} className="button light-button">
                  <Icon name="mail" size={18} />
                  Enviar e-mail
                </a>
              )}
              {LINKEDIN_URL && (
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={EMAIL ? "contact-social" : "button light-button"}
                >
                  <Icon name="linkedin" size={18} />
                  LinkedIn {EMAIL && <Icon name="arrow" size={17} />}
                </a>
              )}
              {GITHUB_URL && (
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="contact-social">
                  <Icon name="github" size={18} />
                  GitHub <Icon name="arrow" size={17} />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 João Gabriel</span>
        <span>Continua. Novos insights em breve.</span>
        <span>
          Feito com <strong>React + Vite</strong>
        </span>
      </footer>
    </div>
  );
}

export default App;
