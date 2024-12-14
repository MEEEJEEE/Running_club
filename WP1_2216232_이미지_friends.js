document.addEventListener("DOMContentLoaded", () => {
    const friendList = document.getElementById("friend-list");

    const friends = [
        {
            nickname: "조수진수",
            id: "12345",
            recentRecord: "11.17 5km 31’ 16”",
            totalDistance: "10%",
            img: "C:\\Users\\SM-PC\\OneDrive\\바탕 화면\\웹프\\WP1_2216232_이미지_기말과제\\2216232_jinsu.jpg.jpg",
        },
        {
            nickname: "신솔솔",
            id: "67890",
            recentRecord: "11.27 3km 17’ 02”",
            totalDistance: "30%",
            img: "C:\\Users\\SM-PC\\OneDrive\\바탕 화면\\웹프\\WP1_2216232_이미지_기말과제\\2216232_sol.jpg.png",
        },
        {
            nickname: "바비",
            id: "54321",
            recentRecord: "12.03 20km 10’ 34”",
            totalDistance: "60%",
            img: "C:\\Users\\SM-PC\\OneDrive\\바탕 화면\\웹프\\WP1_2216232_이미지_기말과제\\2216232_babie.jpg.jpg",
        },
    ];

    friends.forEach((friend) => {
        const card = document.createElement("div");
        card.className = "friend-card";
        card.innerHTML = `
            <img src="${friend.img}" alt="프로필 사진" class="friend-picture">
            <h3>${friend.nickname}</h3>
            <p>ID: ${friend.id}</p>
            <p>최근 기록: ${friend.recentRecord}</p>
            <p>목표 달성율: ${friend.totalDistance}</p>
        `;
        friendList.appendChild(card);
    });
});
