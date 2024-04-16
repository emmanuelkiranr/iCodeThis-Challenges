const profileInfo = [
  {
    id: 1,
    name: "Bertie Yates",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
    age: 29,
  },
  {
    id: 2,
    name: "Hester Hogan",
    image:
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=2866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 32,
  },
  {
    id: 3,
    name: "Larry Little",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    age: 36,
  },
  {
    id: 4,
    name: "Sean Waish",
    image:
      "https://media.istockphoto.com/id/819419874/photo/young-woman-summer-portrait-outdoors.webp?s=170667a&w=0&k=20&c=9SofNH7CyB0SrzLJTwca-o1tl5C07ORHbThgvRk5FHY=",
    age: 34,
  },
  {
    id: 5,
    name: "Lola Gardner",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
    age: 29,
  },
];

const profilesContainer = document.querySelector(".lists");
const profileTemplate = document.getElementById("user-info");

function render() {
  clearElements(profilesContainer);
  profileInfo.forEach((item) => {
    const profileElement = document.importNode(profileTemplate.content, true);
    const imageContainer = profileElement.querySelector(".user-image");
    const username = profileElement.querySelector(".username");
    const age = profileElement.querySelector(".age");

    imageContainer.style.backgroundImage = `url(${item.image})`;
    username.innerText = item.name;
    age.innerText = item.age;
    profilesContainer.appendChild(profileElement);
  });
}

// helper functions
function clearElements(container) {
  while (container.firstElementChild) {
    container.removeChild(container.firstElementChild);
  }
}

render();
