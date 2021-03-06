console.log('Vue ready', Vue);

Vue.config.devtools = true;

const app = new Vue({
  el: '#app',
  data: {
    currentContact: 0,
    writeMessage: '',
    contactFilter: '',
    user: {
      name: 'Nome Utente',
      avatar: '_io',
    },
    contacts: [
      {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            message: 'Hai portato a spasso il cane?',
            status: 'sent',
          },
          {
            date: '10/01/2020 15:50:00',
            message: 'Ricordati di dargli da mangiare',
            status: 'sent',
          },
          {
            date: '10/01/2020 16:15:22',
            message: 'Tutto fatto!',
            status: 'received',
          },
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
          {
            date: '20/03/2020 16:30:00',
            message: 'Ciao come stai?',
            status: 'sent',
          },
          {
            date: '20/03/2020 16:30:55',
            message: 'Bene grazie! Stasera ci vediamo?',
            status: 'received',
          },
          {
            date: '20/03/2020 16:35:00',
            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'received',
          },
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
          {
            date: '28/03/2020 10:10:40',
            message: 'La Marianna va in campagna',
            status: 'received',
          },
          {
            date: '28/03/2020 10:20:10',
            message: 'Sicuro di non aver sbagliato chat?',
            status: 'sent',
          },
          {
            date: '28/03/2020 16:15:22',
            message: 'Ah scusa!',
            status: 'received',
          },
        ],
      },
      {
        name: 'Luisa',
        avatar: '_4',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            message: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent',
          },
          {
            date: '10/01/2020 15:50:00',
            message: 'Si, ma preferirei andare al cinema',
            status: 'received',
          },
        ],
      },
    ],
  },
  methods: {

    // FUNZIONE CHE PERMETTE DI SPOSTARSI TRA GLI UTENTI
    setCurrentContact(index){
      this.currentContact = index;
    },

    // AGGIUNTA NUOVO MESSAGGIO 
    sendMessage(){
      if (!this.writeMessage) return;

      const newMessage = {
        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
        message: this.writeMessage,
        status: 'sent',
      };
      this.contacts[this.currentContact].messages.push(newMessage);

      this.writeMessage = '';

      //RISPOSTA AUTOMATICA DOPO 1 SEC
      setTimeout(() => {
        const answerMessage = {
          date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
          message: 'ok',
          status: 'received',
        };
        this.contacts[this.currentContact].messages.push(answerMessage);

      }, 1000);

    },

    // ULTIMO ACCESSO
    getLastAccess(){
      const messages = this.contacts[this.currentContact].messages;
      const receivedMessages = messages[messages.length - 1];

      return receivedMessages.date;
    },

    // ULTIMO ACCESSO UTENTI
    getLastUserAccess(contact){
      const messages = contact.messages;
      const receivedMessages = messages[messages.length - 1];

      return receivedMessages.date;
    },

    // RICERCA TRA GLI UTENTI
     filterContacts(){
       const filter = this.contactFilter.toLowerCase();
       this.contacts.forEach((contact) => {
         const contactName = contact.name.toLowerCase();
         contact.visible = contactName.includes(filter);
       });
     },

      // CANCELLARE MESSAGGIO
     deletedMessage(index){
      this.contacts[this.currentContact].messages.splice(index,1);
    },
  },
});
