<template>
    <main class="py-6 px-0">
        <div id="recentMessages">
            <h1 class="inter-medium font-color-green font-size-24 page-title">Messages</h1>
            <div id="searchInput" @click="changeFlag(0)">
                <input class="inter-light font-size-14" type="text" placeholder="Search for a host"
                    v-model="ownerSearch">
                <SearchIcon></SearchIcon>
            </div>
            <button @click=openConversation(user.receiver_username) v-for="user in filters" :key="user.name" id="user">
                <img :src="user.image" id="pfp">
                <h2 class="inter-light font-size-18">{{ user.name }} {{ user.last }}</h2>
            </button>
        </div>
        <div v-if="!openFlag" id="selectMessage">
            <Message :size="80" fillColor="#B8B8B8"></Message>
            <p class="inter-light font-color-grey">Select a message to read</p>
        </div>
        <div v-else id="selectedMessage">
            <h1 id="nomeOwner" class="inter-medium font-color-green font-size-24">{{ openConvo[0].name }} {{
                openConvo[0].last }}</h1>
            <div id="messages-container">
                <div id="messages">
                    <div v-for="user in openConvo" id="message">
                        <img :src="user.image" v-if="user.sender_username != loggedUser" id="imageSent">
                        <div v-if="user.sender_username == loggedUser" id="sent">
                            <p class="inter-light">{{ user.content }}</p>
                        </div>
                        <div v-else id="received">
                            <p class="inter-light">{{ user.content }}</p>
                        </div>
                        <img v-if="user.sender_username == loggedUser" :src="user.image" id="imageReceived">
                    </div>
                </div>
            </div>
            <div id="sendNew">
                <input type="text" placeholder="Type a message" v-model="newMessage" id="newMessageInput"
                    class="inter-light">
                <Send @click="addNewMessage(openConvo[0].name, openConvo[0].last)"></Send>
            </div>
        </div>
    </main>
</template>

<script>
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import Send from "vue-material-design-icons/Send.vue";
import Message from "vue-material-design-icons/MessageReplyText.vue";

export default {
    data() {
        return {
            messages: [
                { name: 'Carolina', last: 'Costa', receiver_username: 'alice', sender_username: 'carolina4', content: 'Hello', image: 'https://via.placeholder.com/70x70' },
                { name: 'Carolina', last: 'Costa', receiver_username: 'carolina4', sender_username: 'alice', content: 'Hello, do u have any doubts?', image: 'https://via.placeholder.com/70x70' },
                { name: 'Joana', last: 'Nunes', receiver_username: 'joana', sender_username: 'carolina4', content: 'Hello, is there heating in the igloo?', image: 'https://via.placeholder.com/70x70' },
                { name: 'Joaquim', last: 'Neves', receiver_username: 'joaquim', sender_username: 'carolina4', content: 'Hello', image: 'https://via.placeholder.com/70x70' },
                { name: 'Álvaro', last: 'Cunha', receiver_username: 'alvaro', sender_username: 'carolina4', content: 'Hello, is there heating in the igloo?', image: 'https://via.placeholder.com/70x70' },
                { name: 'Carolina', last: 'Costa', receiver_username: 'alice', sender_username: 'carolina4', content: 'Is there heating in the igloo?', image: 'https://via.placeholder.com/70x70' },
                { name: 'Joaquim', last: 'Neves', receiver_username: 'carolina4', sender_username: 'joaquim', content: 'Hello!', image: 'https://via.placeholder.com/70x70' },
                { name: 'Álvaro', last: 'Cunha', receiver_username: 'carolina4', sender_username: 'alvaro', content: '?', image: 'https://via.placeholder.com/70x70' },
                { name: 'Álvaro', last: 'Cunha', receiver_username: 'carolina4', sender_username: 'alvaro', content: 'Hello', image: 'https://via.placeholder.com/70x70' },
                { name: 'Carolina', last: 'Cunha', receiver_username: 'cunha', sender_username: 'carolina4', content: 'Hello', image: 'https://via.placeholder.com/70x70' },
            ],
            openFlag: false,
            conversation: "",
            loggedUser: 'carolina4',
            newMessage: "",
            ownerSearch: "",
        }
    },

    components: {
        SearchIcon,
        Send,
        Message
    },

    methods: {
        changeFlag(number) {
            if (number == 0) return this.openFlag = false
            if (number == 1) return this.openFlag = true
        },

        openConversation(user) {
            this.changeFlag(1)
            return this.conversation = user
        },


        addNewMessage(first, last) {
            const messagesContainer = document.getElementById('messages-container');
            const isScrolledToBottom = messagesContainer.scrollHeight - messagesContainer.clientHeight <= messagesContainer.scrollTop + 1;

            if (this.newMessage != '') {
                this.messages.push({ name: first, last: last, receiver_username: this.conversation, sender_username: this.loggedUser, content: this.newMessage, image: 'https://via.placeholder.com/70x70' });
            }

            this.$nextTick(() => {
                if (isScrolledToBottom) {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
                }
            });
        }
    },

    computed: {
        users() {
            const filteredUsers = this.messages.filter((user) => user.sender_username === this.loggedUser)
            return filteredUsers.filter((user, index, self) => {
                return self.findIndex((u) => u.sender_username === user.sender_username && u.receiver_username === user.receiver_username) === index
            })
        },

        openConvo() {
            return this.messages.filter((user) => user.receiver_username == this.conversation || user.sender_username == this.conversation)
        },

        filters() {
            return this.users.filter((user) => {
                const fullName = `${user.name.toLowerCase()} ${user.last.toLowerCase()}`
                return fullName.includes(this.ownerSearch.toLowerCase())
            })
        }
    },
}
</script>

<style lang="css" scoped>
main {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2em;
}

#user {
    display: grid;
    grid-template-columns: 70px 1fr;
    column-gap: 2em;
    text-align: left;
    align-items: center;
    margin-bottom: 1rem;
}

#pfp {
    border-radius: 100%;
}

#recentMessages {
    border: #133E1A20 solid 1px;
    border-radius: 11px;
    padding: 1em;
    min-height: 45rem;
    max-height: 45rem;
}

#selectMessage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 45rem;
    max-height: 45rem;
}

#selectedMessage {
    display: flex;
    flex-direction: column;
}

#received,
#sent {
    padding: 1em 1em 3em 1em;
    width: 15em;
    margin-bottom: 10px;
    border-radius: 11px;
}

#received p,
#sent p {
    width: 100%;
    word-wrap: break-word;
}

#sent {
    background-color: #8DE79B30;
    margin-left: auto;
}

#received {
    background-color: #BDBDBD30;
}

#newMessageInput,
#searchInput {
    width: 100%;
    border: #133E1A20 solid 1px;
    border-radius: 11px;
    padding: 0.5em;
}

#newMessageInput:focus,
#searchInput input:focus {
    outline: none;
    border-color: #133E1A20;
}

#searchInput {
    display: flex;
    flex-direction: row;
    margin-bottom: 2em;
}

#searchInput input {
    width: 90%;
}

#message {
    display: flex;
    flex-direction: row;
    column-gap: 1.5em;
}


#messages-container {
    height: 36.5rem;
    max-height: 36.5rem;
    overflow-y: auto;
    padding-right: 2rem;
    box-sizing: content-box;
    scroll-behavior: smooth;
}

#messages {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 36.5rem;
}

#messages-container::-webkit-scrollbar {
    width: 10px;
}

#messages-container::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
}


#imageSent {
    width: 40px;
    height: 40px;
    border-radius: 100%;
}

#imageReceived {
    width: 40px;
    height: 40px;
    border-radius: 100%;
}

#sendNew {
    display: flex;
    flex-direction: row;
    column-gap: 1em;
    align-items: center;
    justify-content: flex-end;
    /* margin-top: 2em; */
    position: fixed;
}

#nomeOwner {
    margin-top: 1em;
}
</style>