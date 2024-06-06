<template>
    <main class="py-6 px-0">
        <div id="recentMessages">
            <h1 class="inter-medium font-color-green font-size-24 page-title">Messages</h1>
            <div id="searchInput" @click="changeFlag(0)">
                <input class="inter-light font-size-14" type="text" placeholder="Search for a host"
                    v-model="ownerSearch">
                <SearchIcon></SearchIcon>
            </div>
            <div v-for="user in filters" :key="user.sender_username">
                <button @click=openConversation(user.sender_username) id="user">
                    <!-- <img :src="user.profile_image" id="pfp"> -->
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" id="pfp">
                    <!-- <h2 class="inter-light font-size-18">{{ user.first }} {{ user.last }}</h2> -->
                    <h2 class="inter-light font-size-18">{{ user.sender_username }}</h2>
                </button>
            </div>
        </div>
        <div v-if="!openFlag & !inexistentConvo" id="selectMessage">
            <Message :size="80" fillColor="#B8B8B8"></Message>
            <p class="inter-light font-color-grey">Select a message to read</p>
        </div>
        <div v-if="openFlag & !inexistentConvo" id="selectedMessage">
            <!-- <h1 id="nomeOwner" class="inter-medium font-color-green font-size-24">{{ openConvo[0].name }} {{
                openConvo[0].last }}</h1> -->
            <h1 id="nomeOwner" class="inter-medium font-color-green font-size-24">{{ getUser(openConvo).sender_username }}
            </h1>
            <div id="messages-container">
                <div id="messages">
                    <div v-for="user in openConvo" id="message">
                        <!-- <img :src="user.profile_image" v-if="user.sender_username != loggedUser" id="imageSent"> -->
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" v-if="user.sender_username != loggedUser" id="imageSent">
                        <div v-if="user.sender_username == loggedUser" id="sent">
                            <p class="inter-light">{{ user.content }}</p>
                        </div>
                        <div v-else id="received">
                            <p class="inter-light">{{ user.content }}</p>
                        </div>
                        <!-- <img v-if="user.sender_username == loggedUser" :src="user.profile_image" id="imageReceived"> -->
                        <img v-if="user.sender_username == loggedUser" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" id="imageReceived">
                    </div>
                </div>
            </div>
            <div id="sendNew">
                <input type="text" placeholder="Type a message" v-model="newMessage" id="newMessageInput"
                    class="inter-light">
                <Send @click="addNewMessage(openConvo[0].name, openConvo[0].last)"></Send>
            </div>
        </div>
        <div v-if="inexistentConvo" id="selectedMessage">
            <h1 id="nomeOwner" class="inter-medium font-color-green font-size-24">{{ $route.params.id }}</h1>
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
import { useMessagesStore } from "@/stores/messages";
import { useUsersStore } from "@/stores/users";

export default {
    data() {
        return {
            // messages: [
            //     { name: 'Carolina', last: 'Costa', receiver_username: 'alice', sender_username: 'carolina4', content: 'Hello', image: 'https://via.placeholder.com/70x70' },
            // ],
            openFlag: false,
            conversation: "",
            filters: [],
            // loggedUser: 'jahon',
            newMessage: "",
            ownerSearch: "",
            inexistentConvo: false,
            messagesStore: useMessagesStore(),
            usersStore: useUsersStore()
        }
    },

    components: {
        SearchIcon,
        Send,
        Message
    },

    methods: {
        changeFlag(number) {
            if (number == 0) return this.openFlag = false, this.inexistentConvo = false
            if (number == 1) return this.openFlag = true
        },

        openConversation(user) {
            this.inexistentConvo = false
            this.changeFlag(1)
            return this.conversation = user
        },

        getUser(conversation) {
            return conversation.find(user => user.sender_username !== this.loggedUser) || {};
        }

        // addNewMessage(first, last) {
        //     const messagesContainer = document.getElementById('messages-container');
        //     const isScrolledToBottom = messagesContainer.scrollHeight - messagesContainer.clientHeight <= messagesContainer.scrollTop + 1;

        //     if (this.newMessage != '') {
        //         this.messages.push({ name: first, last: last, receiver_username: this.conversation, sender_username: this.loggedUser, content: this.newMessage, image: 'https://via.placeholder.com/70x70' });
        //     }

        //     this.$nextTick(() => {
        //         if (isScrolledToBottom) {
        //             messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
        //         }
        //     });
        // }
    },

    watch: {
        '$route.params.id': {
            immediate: true,
            handler(username) {
                if (username) {
                    if ((this.messages.filter((message) => message.sender_username == username || message.receiver_username == username)).length == 0) {
                        this.inexistentConvo = true
                    } else {
                        this.openFlag = true
                        this.openConversation(username)
                    }
                } else {
                    this.openFlag = false;
                }
            },
        },
    },

    computed: {
        messages() {
            return this.messagesStore.getMessages
        },

        users() {
            const users = this.messages.reduce((recentUsers, message) => {
                if (message.sender_username !== this.loggedUser && !recentUsers.some(user => user.sender_username === message.sender_username)) {
                    recentUsers.push({
                        sender_username: message.sender_username,
                        // image: message.profile_image
                        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                    });
                }
                if (message.receiver_username !== this.loggedUser && !recentUsers.some(user => user.sender_username === message.receiver_username)) {
                    recentUsers.push({
                        sender_username: message.receiver_username,
                        // image: message.profile_image
                        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                    });
                }
                return recentUsers;
            }, []);

            return users;
        },

        openConvo() {
            return (this.messages.filter((user) => user.receiver_username == this.conversation || user.sender_username == this.conversation)).reverse()
        },

        filters() {
            // return this.users.filter((user) => {
            //     const fullName = `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`
            //     return fullName.includes(this.ownerSearch.toLowerCase())
            // })
            return this.users.filter((user) => {
                return user.sender_username.startsWith(this.ownerSearch.toLowerCase())
            })
        },

        loggedUser(){
            return this.usersStore.getUserLogged
        }
    },

    created() {
        this.messagesStore.fetchMessage(this.loggedUser);
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
    margin-top: 2em;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    width: 70%;
    padding: 1em;
    z-index: 999;
}

#nomeOwner {
    margin-top: 1em;
}
</style>