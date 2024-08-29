window.onload = function() {
    console.log("Script chargé, démarrage de l'initialisation");

    // Définir les composants de Vue
    const HomeComponent = {
        template: `
        <div id="content">
            <header>
                <section>
                    <figure>
                        <img :src="profileImage" alt="photo de profil de SEZER DOGAN">
                    </figure>
                    <h1> SEZER SEZER </h1>
                    <h2>Développeur web junior</h2>
                </section>
                <nav>
                    <ul>
                        <li><router-link :to="{ hash: '#presentation' }">Présentation</router-link></li>
                        <li><router-link :to="{ hash: '#creations' }">Créations</router-link></li>
                        <li><router-link :to="{ hash: '#contact' }">Contact</router-link></li>
                    </ul>
                </nav>
                <address>
                    <a :href="mapLink">11 rue Richemont 01200 Valserhône</a>
                    <a :href="'mailto:' + email ">{{ email }}</a>
                    <a :href="'tel:' + phone " class="telephone">{{ formattedPhone }}</a>
                </address>
            </header>

            <main>
                <div class="main-container">
                    <section class="container" id="presentation">
                        <div class="container__presentation">
                            <h2>A propos</h2>
                            <p>{{ aboutText }}</p>
                        </div>

                        <div class="container__langues">
                            <h2>Langues parlées</h2>
                            <ul>
                                <li v-for="language in languages" :key="language.name">
                                    {{ language.name }} niveau : {{ language.level }}
                                </li>
                            </ul>
                        </div>

                        <div class="container__loisirs">
                            <h2>Centre d'intérêt</h2>
                            <ul>
                                <li v-for="interest in interests" :key="interest">{{ interest }}</li>
                            </ul>
                        </div>
                    </section>

                    <section class="container-2" id="creations">
                        <div class="container-2__experiences">
                            <h2>Expériences professionnelles</h2>
                            <div v-for="experience in experiences" :key="experience.title">
                                <h3>{{ experience.title }}</h3>
                                <p>{{ experience.company }} {{ experience.dates }}</p>
                                <ul>
                                    <li v-for="task in experience.tasks" :key="task">{{ task }}</li>
                                </ul>
                            </div>
                        </div>

                        <div class="container-2__formations">
                            <h2>Diplômes/Formations</h2>
                            <div v-for="formation in formations" :key="formation.title">
                                <h3>{{ formation.title }}</h3>
                                <p>{{ formation.dates }}</p>
                                <p>{{ formation.school }}</p>
                            </div>
                        </div>

                        <div class="container-2__competences">
                            <h3>Compétences</h3>
                            <ul>
                                <li v-for="skill in skills" :key="skill.name">{{ skill.name }} - {{ skill.level }}</li>
                            </ul>
                        </div>

                        <!-- Section pour les projets -->
                        <div class="container-2__projects">
                            <h2>Projets</h2>
                            <div v-for="project in projects" :key="project.title" class="project-item" @click="openModal(project)">
                                <img :src="project.image" :alt="project.title">
                                <div>
                                    <h3>{{ project.title }}</h3>
                                    <p>{{ project.description }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Section pour les témoignages -->
                        <div class="container-2__testimonials">
                            <h2>Témoignages</h2>
                            <div v-for="testimonial in testimonials" :key="testimonial.name" class="testimonial-item">
                                <p>"{{ testimonial.feedback }}"</p>
                                <p>- {{ testimonial.name }}</p>
                            </div>
                        </div>

                        <!-- Section pour contacter -->
                        <div class="container-2__contact" id="contact">
                            <h2>Contactez-moi</h2>
                            <form @submit.prevent="submitForm">
                                <div class="form-group">
                                    <label for="name">Nom</label>
                                    <input type="text" id="name" v-model="contactForm.name" required>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" v-model="contactForm.email" required>
                                </div>
                                <div class="form-group">
                                    <label for="message">Message</label>
                                    <textarea id="message" v-model="contactForm.message" required></textarea>
                                </div>
                                <button type="submit">Envoyer</button>
                            </form>
                        </div>
                    </section>
                </div>

                <!-- Modal pour les projets -->
                <div v-if="selectedProject" class="modal" @click.self="closeModal">
                    <div class="modal-content">
                        <span class="close-btn" @click="closeModal">&times;</span>
                        <h3>{{ selectedProject.title }}</h3>
                        <p>Date de création : {{ selectedProject.date }}</p>
                        <p>Technologies utilisées : {{ selectedProject.technologies }}</p>
                        <a :href="selectedProject.link" target="_blank">Voir le projet</a>
                        <span style="margin-left: 20px;"></span> <!-- Espace entre les liens -->
                        <a :href="selectedProject.github" target="_blank">Repository GitHub</a>
                    </div>
                </div>
            </main>

            <footer>
                <div class="social-icons">
                    <a v-for="social in socialLinks" :key="social.name" :href="social.link" target="_blank" class="social-icon">
                        <img :src="social.icon" :alt="'logo ' + social.name">
                    </a>
                </div>
                <p>Dernière mise à jour : {{ lastUpdated }}</p>

                <!-- Nouvelle image en bas de page pour remonter en haut -->
                <figure>
                    <img :src="backToTopImage" alt="Retour en haut" @click="scrollToTop" class="back-to-top">
                </figure>
            </footer>
        </div>
        `,
        data() {
            console.log("Initialisation du composant Home");
            return {
                profileImage: './assets/photo/photo-cv.jpg',
                backToTopImage: './assets/photo/flechehaut.png', // Image en bas de page pour remonter
                mapLink: 'https://maps.app.goo.gl/E6ADXW1R8DETj32o7',
                email: 'sezer.sezer@hotmail.fr',
                phone: '0653456789',
                aboutText: `Curieux, organisé et disposant d'une forte capacité d'adaptation, je sais porter un regard critique sur le travail que je fournis. De même, j'entends apporter une contribution positive à votre groupe en vous faisant bénéficier de ma rigueur d'analyse et de mon sens de la communication.`,
                languages: [
                    { name: 'anglais', level: 'B2' },
                    { name: 'turc', level: 'C2' },
                    { name: 'français', level: 'C1' },
                ],
                interests: ['ski', 'musculation', 'voyage', 'vtt', 'randonnée'],
                experiences: [
                    {
                        title: 'Apprenti Responsable RH - SAS DANNECY',
                        company: "MCDONALD'S ANNECY (centre commercial Carrefour)",
                        dates: 'Sept 2021/... 2023',
                        tasks: [
                            'Recrutement et embauche : chargé de recruter du personnel, d\'interviewer les candidats et de les embaucher.',
                            'Formation et développement : responsable de la mise en oeuvre des programmes de formation pour les nouveaux employés et pour le perfectionnement du personnel existant.',
                            'Gestion des relations avec les employés : la personne de contact principale pour toutes les questions liées aux employés.',
                            'Conformité légale : Veille à ce que le restaurant soit en conformité avec toutes les lois du travail et les réglementations en matière de santé et de sécurité.',
                            'Gestion des performances : Chargé d\'organiser et de mener les évaluations de performance, de fournir des retours d\'information et de gérer toute discipline nécessaire.',
                            'Communication interne : Responsable de la communication avec l\'ensemble du personnel, de la diffusion des informations importantes et de la facilitation des réunions du personnel.',
                        ],
                    },
                    {
                        title: 'CHARGÉ DE CLIENTÈLE',
                        company: 'SOCIÉTÉ GÉNÉRALE Ferney-Voltaire',
                        dates: 'Nov 2020/ Août 2021',
                        tasks: [
                            'Conseiller de clientèle (solution de financement, investissement, placement...)',
                            'Vente de produits financiers & assurances...',
                            'RDV clients & négociation...',
                            'Gestion de portefeuille clients',
                        ],
                    },
                ],
                formations: [
                    {
                        title: 'Bac +2 : Développeur Web / Web mobile',
                        dates: 'février 2024 - février 2025',
                        school: 'Centre européen de formation',
                    },
                    {
                        title: 'Bac +5 : Master Manager en RH',
                        dates: 'septembre 2021 - juillet 2023',
                        school: 'INSEEC Campus Chambéry',
                    },
                ],
                projects: [
                    {
                        title: 'Projet 1',
                        description: 'Description du projet 1...',
                        image: './assets/photo/projet1.jpg',
                        date: '2023-01-01',
                        technologies: 'HTML, CSS, Vue.js',
                        link: 'https://example.com',
                        github: 'https://github.com/sezer92/projet1'
                    },
                    {
                        title: 'Projet 2',
                        description: 'Description du projet 2...',
                        image: './assets/photo/projet2.jpg',
                        date: '2023-02-01',
                        technologies: 'JavaScript, Vue.js',
                        link: 'https://example.com',
                        github: 'https://github.com/sezer92/projet2'
                    },
                ],
                testimonials: [
                    {
                        name: 'Client 1',
                        feedback: 'Super travail, très professionnel!',
                    },
                    {
                        name: 'Client 2',
                        feedback: 'Je recommande fortement.',
                    },
                ],
                skills: [
                    { name: 'HTML 5', level: 'Expert' },
                    { name: 'CSS 3', level: 'Intermédiaire' },
                    { name: 'Github', level: 'Débutant' },
                ],
                socialLinks: [
                    { name: 'linkedin', link: 'https://www.linkedin.com/in/sezer-dogan-90356a13a/', icon: './assets/photo/linkedin.png' },
                    { name: 'twitter', link: 'https://twitter.com/?lang=fr', icon: './assets/photo/twitter.png' },
                    { name: 'github', link: 'https://github.com/sezer92', icon: './assets/photo/signe-github.png' },
                ],
                contactForm: {
                    name: '',
                    email: '',
                    message: ''
                },
                lastUpdated: new Date().toLocaleDateString(),
                selectedProject: null
            };
        },
        computed: {
            formattedPhone() {
                return this.phone.replace(/(\d{2})(?=\d)/g, '$1.');
            }
        },
        methods: {
            submitForm() {
                const formData = {
                    name: this.contactForm.name,
                    email: this.contactForm.email,
                    message: this.contactForm.message,
                };

                axios.post('https://example.com/contact', formData) // Remplacez par votre URL de backend
                    .then(response => {
                        console.log("Formulaire soumis :", response.data);
                        alert('Formulaire soumis avec succès!');
                        // Réinitialiser le formulaire après envoi
                        this.contactForm.name = '';
                        this.contactForm.email = '';
                        this.contactForm.message = '';
                    })
                    .catch(error => {
                        console.error("Erreur lors de la soumission du formulaire :", error);
                        alert('Une erreur est survenue lors de la soumission du formulaire.');
                    });
            },
            scrollToTop() {
                console.log("Retour en haut de page");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            openModal(project) {
                this.selectedProject = project;
            },
            closeModal() {
                this.selectedProject = null;
            },
            isActive(section) {
                return window.location.hash === section;
            },
            updateActiveLink() {
                const sections = ['#presentation', '#creations', '#contact'];
                sections.forEach(section => {
                    const link = document.querySelector(`a[href="${section}"]`);
                    if (link) {
                        link.classList.toggle('active', window.location.hash === section);
                    }
                });
            }
        },
        mounted() {
            window.addEventListener('hashchange', this.updateActiveLink);
            this.updateActiveLink(); // Mettre à jour au premier rendu
        }
    };

    const NotFoundComponent = {
        template: `
        <div class="not-found">
            <h1>404</h1>
            <p>Page non trouvée.</p>
            <img src="./assets/photo/error404.webp" alt="404 image">
        </div>
        `
    };

    // Création du routeur Vue avec scroll behavior pour gérer les ancres
    const router = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                    el: to.hash,
                    behavior: 'smooth',
                };
            }
            return { top: 0 };
        },
        routes: [
            { path: '/', component: HomeComponent },
            { path: '/:pathMatch(.*)*', component: NotFoundComponent }
        ]
    });

    console.log("Routeur initialisé");

    // Création de l'application Vue
    const app = Vue.createApp({});
    app.use(router);
    app.mount('#app');
    console.log("Application Vue montée");
};









