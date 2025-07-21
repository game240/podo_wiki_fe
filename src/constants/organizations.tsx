export interface SectionItem {
  title: string;
  content: React.ReactNode;
  children?: SectionItem[];
}

export const organizations: SectionItem[] = [
  {
    title: "연극 단체",
    content: <p>구조도</p>,
    children: [
      {
        title: "수도권",
        content: <p>수도권</p>,
        children: [
          {
            title: "가천대학교",
            content: <p>가천대학교</p>,
            children: [
              {
                title: "아름",
                content: <p>아름</p>,
              },
            ],
          },
          {
            title: "가톨릭대학교",
            content: <p>가톨릭대학교</p>,
            children: [
              {
                title: "성심극예술연구회",
                content: <p>성심극예술연구회</p>,
              },
            ],
          },
          {
            title: "경기대학교",
            content: <p>경기대학교</p>,
            children: [
              {
                title: "나루극예술연구회",
                content: <p>나루극예술연구회</p>,
              },
            ],
          },
          {
            title: "경희대학교 (국제)",
            content: <p>경희대학교 (국제)</p>,
            children: [
              {
                title: "경희극회",
                content: <p>경희극회</p>,
              },
            ],
          },
          {
            title: "광운대학교",
            content: <p>광운대학교</p>,
            children: [
              {
                title: "광운극예술연구회",
                content: <p>광운극예술연구회</p>,
              },
            ],
          },
          {
            title: "단국대학교 (죽전)",
            content: <p>단국대학교 (죽전)</p>,
            children: [
              {
                title: "극예술연구회",
                content: <p>극예술연구회</p>,
              },
            ],
          },
          {
            title: "서울시립대학교",
            content: <p>서울시립대학교</p>,
            children: [
              {
                title: "극예술연구회",
                content: <p>극예술연구회</p>,
              },
            ],
          },
          {
            title: "성균관대학교",
            content: <p>성균관대학교</p>,
            children: [
              {
                title: "능라촌",
                content: <p>능라촌</p>,
              },
            ],
          },
          {
            title: "이화여자대학교",
            content: <p>이화여자대학교</p>,
            children: [
              {
                title: "총연극회",
                content: <p>총연극회</p>,
              },
            ],
          },
          {
            title: "인하대학교",
            content: <p>인하대학교</p>,
            children: [
              {
                title: "인하극예술연구회",
                content: <p>인하극예술연구회</p>,
              },
            ],
          },
          {
            title: "중앙대학교",
            content: <p>중앙대학교</p>,
            children: [
              {
                title: "영죽무대",
                content: <p>영죽무대</p>,
              },
            ],
          },
          {
            title: "한성대학교",
            content: <p>한성대학교</p>,
            children: [
              {
                title: "낙산극회",
                content: <p>낙산극회</p>,
              },
            ],
          },
          {
            title: "한양대학교 (에리카)",
            content: <p>한양대학교 (에리카)</p>,
            children: [
              {
                title: "무대 밖의 삐에로",
                content: <p>무대 밖의 삐에로</p>,
              },
              {
                title: "살판",
                content: <p>살판</p>,
              },
            ],
          },
          {
            title: "협성대학교",
            content: <p>협성대학교</p>,
            children: [
              {
                title: "띠앗",
                content: <p>띠앗</p>,
              },
            ],
          },
          {
            title: "홍익대학교",
            content: <p>홍익대학교</p>,
            children: [
              {
                title: "홍익극예술연구회",
                content: <p>홍익극예술연구회</p>,
              },
            ],
          },
        ],
      },
      {
        title: "강원권",
        content: <p>강원권</p>,
        children: [
          {
            title: "연세대학교 (미래)",
            content: <p>연세대학교 (미래)</p>,
            children: [
              {
                title: "외솔극회",
                content: <p>외솔극회</p>,
              },
            ],
          },
        ],
      },
      {
        title: "충청권",
        content: <p>충청권</p>,
        children: [
          {
            title: "건국대학교 (글로컬)",
            content: <p>건국대학교 (글로컬)</p>,
            children: [
              {
                title: "극단 소솜",
                content: <p>극단 소솜</p>,
              },
              {
                title: "건국극회 한울",
                content: <p>건국극회 한울</p>,
              },
            ],
          },
          {
            title: "남서울대학교",
            content: <p>남서울대학교</p>,
            children: [
              {
                title: "아름다운 사람들",
                content: <p>아름다운 사람들</p>,
              },
            ],
          },
          {
            title: "충북대학교",
            content: <p>충북대학교</p>,
            children: [
              {
                title: "시네씨아",
                content: <p>시네씨아</p>,
              },
            ],
          },
          {
            title: "공주대학교",
            content: <p>공주대학교</p>,
            children: [
              {
                title: "동선",
                content: <p>동선</p>,
              },
            ],
          },
        ],
      },
      {
        title: "전라권",
        content: <p>전라권</p>,
        children: [
          {
            title: "광주과학기술원",
            content: <p>광주과학기술원</p>,
            children: [
              {
                title: "지대로",
                content: <p>지대로</p>,
              },
            ],
          },
          {
            title: "전남대학교",
            content: <p>전남대학교</p>,
            children: [
              {
                title: "전대극회",
                content: <p>전대극회</p>,
              },
            ],
          },
        ],
      },
      {
        title: "경상권",
        content: <p>경상권</p>,
        children: [
          {
            title: "경일대학교",
            content: <p>경일대학교</p>,
            children: [
              {
                title: "열린무대",
                content: <p>열린무대</p>,
              },
            ],
          },
          {
            title: "동국대학교 (WISE)",
            content: <p>동국대학교 (WISE)</p>,
            children: [
              {
                title: "동국연극회",
                content: <p>동국연극회</p>,
              },
            ],
          },
        ],
      },
      {
        title: "제주권",
        content: <p>제주권</p>,
      },
    ],
  },
  {
    title: "뮤지컬 단체",
    content: <p>뮤지컬 단체</p>,
  },
];
