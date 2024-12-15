document.addEventListener("DOMContentLoaded", () => {
    const friendList = document.getElementById("friend-list");

    // 친구 데이터 예시
    const friends = [
        {
            name: "조수진수",
            id: "12345",
            photo: "./WP1_2216232_이미지_friend1.jpg",
            recentRecord: "11.17 / 5km / 31'16''",
            goalProgress: "10%",
        },
        {
            name: "신솔솔",
            id: "67890",
            photo: "./WP1_2216232_이미지_friend2.jpg",
            recentRecord: "11.27 / 3km / 17'02''",
            goalProgress: "30%",
        },
        {
            name: "바비",
            id: "54321",
            photo: "./WP1_2216232_이미지_friend3.jpg",
            recentRecord: "12.03 / 20km / 10'34''",
            goalProgress: "60%",
        },
    ];

    // 친구 카드 생성 함수
    const createFriendCard = (friend) => {
        const card = document.createElement("div");
        card.classList.add("friend-card");

        const photo = document.createElement("img");
        photo.src = friend.photo;
        photo.alt = `${friend.name}의 프로필 사진`;

        const info = document.createElement("div");
        info.classList.add("friend-info");

        const name = document.createElement("span");
        name.textContent = `닉네임: ${friend.name}`;

        const id = document.createElement("span");
        id.textContent = `아이디: ${friend.id}`;

        const record = document.createElement("span");
        record.textContent = `최근 기록: ${friend.recentRecord}`;

        const progress = document.createElement("span");
        progress.textContent = `목표 달성도: ${friend.goalProgress}`;

        info.appendChild(name);
        info.appendChild(id);
        info.appendChild(record);
        info.appendChild(progress);

        card.appendChild(photo);
        card.appendChild(info);

        return card;
    };

    // 친구 목록 렌더링
    friends.forEach((friend) => {
        const card = createFriendCard(friend);
        friendList.appendChild(card);
    });
});
