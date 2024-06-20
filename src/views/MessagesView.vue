<template>
    <main class="py-2 px-0">
        <div id="recentMessages">
            <h1 class="inter-medium font-color-green font-size-24 title">Messages</h1>
            <div id="searchInput" @click="changeFlag(0)">
                <input class="inter-light font-size-14" type="text" placeholder="Search for a host"
                    v-model="ownerSearch">
                <SearchIcon></SearchIcon>
            </div>
            <div v-for="user in filters" :key="user.sender_username">
                <button @click=openConversation(user) id="user">
                    <img :src="user.image" id="pfp">
                    <h2 class="inter-light font-size-18">{{ user.first }} {{ user.last }}</h2>
                </button>
            </div>
        </div>
        <div v-if="!openFlag & !inexistentConvo" id="selectMessage">
            <Message :size="80" fillColor="#B8B8B8"></Message>
            <p class="inter-light font-color-grey">Select a message to read</p>
        </div>
        <div v-if="openFlag & !inexistentConvo" id="selectedMessage">
            <h1 id="nome" class="inter-medium font-color-green font-size-24">{{ conversation.first }} {{
                conversation.last }}</h1>
            <h1 id="username" class="inter-light font-color-green font-size-14">@{{ conversation.sender_username }}</h1>
            <div id="messages-container" ref="messagesContainer">
                <div id="messages">
                    <div v-for="user in openConvo" id="message">
                        <img :src="user.sender.profile_image" v-if="user.sender_username != loggedUser" id="imageSent">
                        <div v-if="user.sender_username == loggedUser" id="sent">
                            <p class="inter-light">{{ user.content }}</p>
                        </div>
                        <div v-else id="received">
                            <p class="inter-light">{{ user.content }}</p>
                        </div>
                        <img v-if="user.sender_username == loggedUser" :src="user.sender.profile_image" id="imageReceived">
                    </div>
                </div>
            </div>
            <div id="sendNew">
                <input type="text" placeholder="Type a message" v-model="newMessage" id="newMessageInput"
                    class="inter-light">
                <Send @click="addNewMessage(conversation)"></Send>
            </div>
        </div>
        <div v-if="inexistentConvo" id="selectedMessage">
            <h1 id="nome" class="inter-medium font-color-green font-size-24">{{ user.first_name }} {{
                user.last_name }}</h1>
            <h1 id="username" class="inter-light font-color-green font-size-14">@{{ $route.params.id }}</h1>
            <div id="messages-container" ref="messagesContainer">
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
                <Send @click="addNewMessage($route.params.id)"></Send>
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
            openFlag: false,
            conversation: [],
            filters: [],
            newMessage: "",
            ownerSearch: "",
            inexistentConvo: false,
            messagesStore: useMessagesStore(),
            usersStore: useUsersStore(),
            newMessageToAdd: []
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

        openConversation(userInfo) {
            this.inexistentConvo = false
            this.changeFlag(1)
            this.conversation = { sender_username: userInfo.sender_username, first: userInfo.first, last: userInfo.last }
            this.$nextTick(() => {
                this.scrollToBottom();
            })
        },


        scrollToBottom() {
            const container = this.$refs.messagesContainer
            if (container) {
                container.scrollTop = container.scrollHeight
            }
        },

        async addNewMessage(receiver) {
            this.newMessageToAdd.content = this.newMessage;
            const receiverUsername = this.inexistentConvo ? this.$route.params.id : receiver.sender_username
            this.newMessageToAdd.receiver_username = receiverUsername
            this.newMessageToAdd.sender_username = this.loggedUser

            await this.messagesStore.createMessage(this.newMessageToAdd)
            this.newMessage = ""

            await this.messagesStore.fetchMessage(this.loggedUser)

            const userMessages = this.messagesStore.getMessages
            const userExists = userMessages.some((message) => message.sender_username === receiverUsername || message.receiver_username === receiverUsername)

            if (userExists) {
                this.inexistentConvo = false
                this.openFlag = true
                const userInfo = userMessages.find((message) => message.sender_username === receiverUsername || message.receiver_username === receiverUsername)
                const isSender = userInfo.sender_username === this.loggedUser

                this.openConversation({
                    sender_username: isSender ? userInfo.receiver_username : userInfo.sender_username,
                    first: isSender ? userInfo.receiver.first_name : userInfo.sender.first_name,
                    last: isSender ? userInfo.receiver.last_name : userInfo.sender.last_name
                })
            } else {
                this.inexistentConvo = true
                this.openFlag = false
            }

            this.$nextTick(() => {
                this.scrollToBottom()
            })
        },
    },

    watch: {
        '$route.params.id': {
            immediate: true,
            handler(username) {
                if (username) {
                    this.messagesStore.fetchMessage(this.loggedUser).then(() => {
                        const userMessages = this.messagesStore.getMessages
                        const userExists = userMessages.some((message) => message.sender_username === username || message.receiver_username === username)

                        if (userExists) {
                            this.inexistentConvo = false;
                            this.openFlag = true;
                            const userInfo = userMessages.find((message) => message.sender_username === username || message.receiver_username === username)
                            this.openConversation({ sender_username: userInfo.receiver_username, first: userInfo.receiver.first_name, last: userInfo.receiver.last_name })
                        } else {
                            this.inexistentConvo = true
                            this.openFlag = false
                            this.usersStore.fetchUser(this.$route.params.id)
                        }
                    })
                } else {
                    this.openFlag = false
                    this.inexistentConvo = false
                }
            },
        },

        openConvo() {
            this.$nextTick(() => {
                this.scrollToBottom()
            });
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
                        sender_username: message.sender.username,
                        image: message.sender.profile_image,
                        first: message.sender.first_name,
                        last: message.sender.last_name
                    });
                }
                if (message.receiver_username !== this.loggedUser && !recentUsers.some(user => user.sender_username === message.receiver_username)) {
                    recentUsers.push({
                        sender_username: message.receiver.username,
                        image: message.receiver.profile_image,
                        first: message.receiver.first_name,
                        last: message.receiver.last_name
                    });
                }

                return recentUsers;
            }, []);

            return users;
        },

        openConvo() {
            return (this.messages.filter((user) => user.receiver_username == this.conversation.sender_username || user.sender_username == this.conversation.sender_username)).reverse()
        },

        filters() {
            return this.users.filter((user) => {
                const fullName = `${user.first.toLowerCase()} ${user.last.toLowerCase()}`
                return fullName.includes(this.ownerSearch.toLowerCase())
            })

        },

        loggedUser() {
            return this.usersStore.getUserLogged
        },

        user() {
            return this.usersStore.getUser
        }
    },

    async created() {
        await this.messagesStore.fetchMessage(this.loggedUser)
        if (this.$route.params.id) {
            await this.usersStore.fetchUser(this.$route.params.id)
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
    grid-template-columns: 60px 1fr;
    column-gap: 2em;
    text-align: left;
    align-items: center;
    margin-bottom: 1rem;
}

#pfp {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

#recentMessages {
    border: #133E1A20 solid 1px;
    border-radius: 11px;
    padding: 1em;
    /* min-height: 45rem;
    max-height: 45rem; */
    min-height: 35rem;
    max-height: 35rem;
}

#selectMessage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* min-height: 45rem;
    max-height: 45rem; */
    min-height: 35rem;
    max-height: 35rem;
}

#selectedMessage {
    display: flex;
    flex-direction: column;
    /* min-height: 45rem;
    max-height: 45rem; */
    min-height: 35rem;
    max-height: 35rem;
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
    height: 27.5rem;
    max-height: 27.5rem;
    /* height: 36.5rem;
    max-height: 36.5rem; */
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
    object-fit: cover;
}

#imageReceived {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: cover;
}

#sendNew {
    display: flex;
    flex-direction: row;
    column-gap: 1em;
    align-items: center;
    justify-content: flex-end;
    margin-top: 2em;
    position: fixed;
    /* bottom: 0; */
    top: 36.5rem;
    /* top: 46.5rem; */
    background-color: #ffffff;
    width: 70%;
    padding: 0.5em;
    z-index: 999;
}

#nome {
    margin-top: 0.5em;
}

#username {
    margin-bottom: 0.5em;
}

.title {
    margin-bottom: 1rem;
}
</style>