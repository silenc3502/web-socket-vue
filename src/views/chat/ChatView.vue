<template>
    <div>
        <h1>WebSocket Example</h1>
        <p v-if="connected">Connected to WebSocket</p>
        <p v-else>Disconnected from WebSocket</p>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            connected: false,
            socket: null,
        };
    },
    mounted() {
        // Socket.IO 연결
        this.socket = io('http://localhost:9999', {
            reconnection: false,
            query: `username='hi'&room='test'`, //"room=" + room+",username="+username,
        }); // WebSocket 서버의 주소에 맞게 변경

        // 연결 이벤트 처리
        this.socket.on('connect', () => {
            this.connected = true;
            console.log('Connected to WebSocket');
            //this.joinRoomAndSendInfo();
        });

        // 연결 해제 이벤트 처리
        this.socket.on('disconnect', () => {
            this.connected = false;
            console.log('Disconnected from WebSocket');
        });

        // 기타 이벤트 처리
        // this.socket.on('event', (data) => {
        //   console.log('Received event:', data);
        // });

        // 소멸 시 연결 해제
        this.$once('hook:beforeDestroy', () => {
            this.socket.disconnect();
        });
    },
    methods: {
        joinRoomAndSendInfo() {
            // 방 정보 및 사용자명 설정
            const room = 'room'; // 방 정보
            const username = 'username'; // 사용자명

            // 서버로 정보 전송
            if (room && username) {
                this.socket.emit('joinRoom', { room, username });

                // 서버로 메시지 전송
                const payload = {
                    content: 'Hello, Server!', // 메시지 내용
                    username, // 사용자명
                    messageType: 'CLIENT', // 메시지 타입
                };
                this.socket.emit('sendMessage', payload);
            } else {
                console.error('Room or username is missing.');
                // 처리할 수 없는 경우에 대한 로직
            }
        },
    },
};
</script>
