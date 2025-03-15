 // Khi bấm vào avatar hoặc cover, mở hộp thoại chọn file
 document.getElementById('avatar-img').addEventListener('click', function () {
    document.getElementById('avatar-upload').click();
});

document.getElementById('cover-img').addEventListener('click', function () {
    document.getElementById('cover-upload').click();
});

// Lưu avatar vào backend khi người dùng chọn ảnh mới
document.getElementById('avatar-upload').addEventListener('change', function (event) {
const file = event.target.files[0];
if (file) {
const reader = new FileReader();
reader.onload = function (e) {
    document.getElementById('avatar-img').src = e.target.result;
    // Gọi API để lưu avatar lên server
    fetch('/api/save-avatar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avatar: e.target.result })
    });
};
reader.readAsDataURL(file);
}
});

// Lưu ảnh bìa vào backend khi người dùng chọn ảnh mới
document.getElementById('cover-upload').addEventListener('change', function (event) {
const file = event.target.files[0];
if (file) {
const reader = new FileReader();
reader.onload = function (e) {
    document.getElementById('cover-img').src = e.target.result;
    // Gọi API để lưu ảnh bìa lên server
    fetch('/api/save-cover', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cover: e.target.result })
    });
};
reader.readAsDataURL(file);
}
});

// Hiển thị form Personal Information
function showEditForm() {
document.getElementById('edit-form').style.display = 'block';
}

// Đóng form Personal Information
document.querySelector('#edit-form .close-btn').addEventListener('click', function () {
document.getElementById('edit-form').style.display = 'none';
});

// Hàm đóng form education
function closeEducationForm() {
document.getElementById('add-education').style.display = 'none';
}
// Hiển thị form Education
function showEducationForm() {
document.getElementById('add-education').style.display = 'block';
}

// Hàm đóng form Experience
function closeExperienceForm() {
document.getElementById('add-experience').style.display = 'none';
}
// Hiển thị form Experience
function showExperienceForm() {
document.getElementById('add-experience').style.display = 'block';
}
// Hàm đóng form Skill
function closeSkillForm() {
document.getElementById('add-skill').style.display = 'none';
}
// Hiển thị form Skill
function showSkillForm() {
document.getElementById('add-skill').style.display = 'block';
}
// Hiển thị form Languages
function showLanguageForm() {
document.getElementById('add-language').style.display = 'block';
}
// Hàm đóng form Languages
function closeLanguageForm() {
document.getElementById('add-language').style.display = 'none';
}

// Hàm đóng form Certificate
function closeCertificateForm() {
document.getElementById('add-certificate').style.display = 'none';
}
// Hiển thị form Certificate
function showCertificateForm() {
document.getElementById('add-certificate').style.display = 'block';
}

// Hàm đóng form Prize
function closePrizeForm() {
document.getElementById('add-prize').style.display = 'none';
}
// Hiển thị form Prize
function showPrizeForm() {
document.getElementById('add-prize').style.display = 'block';
}

// Hàm đóng form Project
function closeProjectForm() {
document.getElementById('add-project').style.display = 'none';
}
// Hiển thị form Project
function showProjectForm() {
document.getElementById('add-project').style.display = 'block';
}
//Hiển thị thông tin của Edit info
document.querySelector("#edit-form form").addEventListener("submit", function (event) {
event.preventDefault(); // Ngăn chặn reload trang

// Lấy giá trị từ form
let fullName = document.getElementById("full-name").value;
let jobPosition = document.getElementById("job-position").value;
let intro = document.getElementById("intro").value;

// Cập nhật vào profile
document.querySelector(".profile-info h2").textContent = fullName;
document.querySelector(".profile-info h3").textContent = jobPosition;
document.querySelector(".profile-info h4").textContent = intro;

// Gọi API để lưu thông tin cá nhân lên server
fetch('/api/save-profile', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ fullName, jobPosition, intro })
});

// Ẩn form sau khi cập nhật
document.getElementById("edit-form").style.display = "none";
});
//Hiển thị thông tin của Education
document.querySelector("#add-education form").addEventListener("submit", function (event) {
event.preventDefault(); // Ngăn chặn reload trang

// Lấy giá trị từ form nhập
let school = document.getElementById("school").value;
let major = document.getElementById("major").value;
let beginMonth = document.getElementById("begin-month").value;
let beginYear = document.getElementById("begin-year").value;
let endMonth = document.getElementById("end-month").value;
let endYear = document.getElementById("end-year").value;

// Kiểm tra nếu người dùng chưa nhập đủ dữ liệu
if (!school || !major || !beginMonth || !beginYear || !endMonth || !endYear) {
alert("Vui lòng nhập đầy đủ thông tin.");
return;
}

// Tạo một phần tử div mới để hiển thị mục Education
let educationItem = document.createElement("div");
educationItem.classList.add("education-item");
educationItem.innerHTML = `
<h4>${school}</h4>
<p><strong>Major:</strong> ${major}</p>
<p><strong>Time:</strong> ${beginMonth}/${beginYear} - ${endMonth}/${endYear}</p>
<button onclick="removeEducation(this)">Remove</button>
`;

// Thêm phần tử mới vào danh sách Education
document.getElementById("education-list").appendChild(educationItem);

// Gọi API để lưu Education lên server
fetch('/api/save-education', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ school, major, beginMonth, beginYear, endMonth, endYear })
});

// Xóa dữ liệu trong form sau khi thêm
document.getElementById("add-education").querySelector("form").reset();

// Ẩn form Education sau khi thêm
closeEducationForm();
});

// Hàm xóa một mục Education
function removeEducation(button) {
// Gọi API để xóa Education từ server
fetch('/api/delete-education', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ school: button.parentElement.querySelector("h4").textContent })
});

button.parentElement.remove();
}
//Hiển thị thông tin của Experience
document.querySelector("#add-experience form").addEventListener("submit", function (event) {
event.preventDefault(); // Ngăn chặn reload trang

// Lấy giá trị từ form nhập
let company = document.getElementById("Company").value;
let position = document.getElementById("position").value;
let detaileddescription = document.getElementById("detailed-description").value;
let beginMonth = document.getElementById("exp-begin-month").value;
let beginYear = document.getElementById("exp-begin-year").value;
let endMonth = document.getElementById("exp-end-month").value;
let endYear = document.getElementById("exp-end-year").value;

// Kiểm tra nếu người dùng chưa nhập đủ dữ liệu
if (!company || !position || !beginMonth || !beginYear || !endMonth || !endYear) {
alert("Vui lòng nhập đầy đủ thông tin.");
return;
}

// Tạo một phần tử div mới để hiển thị mục Experience
let experienceItem = document.createElement("div");
experienceItem.classList.add("experience-item");
experienceItem.innerHTML = `
<h4>${company}</h4>
<p><strong>Position:</strong> ${position}</p>
<p><strong>Time:</strong> ${beginMonth}/${beginYear} - ${endMonth}/${endYear}</p>
<p><strong>Detailed Description:</strong> ${detaileddescription}</p>
<button onclick="removeExperience(this)">Remove</button>
`;

// Thêm phần tử mới vào danh sách Experience
document.getElementById("experience-list").appendChild(experienceItem);

// Gọi API để lưu Experience lên server
fetch('/api/save-experience', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ company, position, detaileddescription, beginMonth, beginYear, endMonth, endYear })
});

// Xóa dữ liệu trong form sau khi thêm
document.getElementById("add-experience").querySelector("form").reset();

// Ẩn form Experience sau khi thêm
closeExperienceForm();
});

// Hàm xóa một mục Experience
function removeExperience(button) {
// Gọi API để xóa Experience từ server
fetch('/api/delete-experience', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ company: button.parentElement.querySelector("h4").textContent })
});

button.parentElement.remove();
}
//Hiển thị thông tin của Skill
document.querySelector("#add-skill form").addEventListener("submit", function (event) {
event.preventDefault(); // Ngăn reload trang

let skillName = document.getElementById("skill-name").value.trim();

if (!skillName) {
alert("Vui lòng nhập kỹ năng.");
return;
}

// ✅ Tạo thẻ <li> chứa kỹ năng
let skillItem = document.createElement("li");
skillItem.textContent = skillName;

// ✅ Thêm nút Remove chỉ trong Profile
let removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
removeBtn.onclick = function () {
skillItem.remove();
// Gọi API để xóa Skill từ server
fetch('/api/delete-skill', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ skill: skillName })
});
};

skillItem.appendChild(removeBtn);

// ✅ Thêm vào danh sách kỹ năng trong Profile
document.getElementById("skill-list").appendChild(skillItem);

// Gọi API để lưu Skill lên server
fetch('/api/save-skill', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ skill: skillName })
});

// Xóa dữ liệu nhập sau khi thêm
document.getElementById("add-skill").querySelector("form").reset();

// Ẩn form
closeSkillForm();
});
// Hàm xóa kỹ năng trong Profile
function removeSkill(button) {
// Gọi API để xóa Skill từ server
fetch('/api/delete-skill', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ skill: button.parentElement.textContent.replace("Remove", "").trim() })
});

button.parentElement.remove();
}
//Hiển thị Languages
document.querySelector("#add-language form").addEventListener("submit", function (event) {
event.preventDefault(); // Ngăn chặn reload trang

let languageName = document.getElementById("language-name").value.trim();

if (!languageName) {
alert("Please enter a language");
return;
}

let languageItem = document.createElement("li");
languageItem.textContent = `${languageName}`;

let removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
removeBtn.addEventListener("click", function () {
languageItem.remove();
// Gọi API để xóa Language từ server
fetch('/api/delete-language', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language: languageName })
});
});

languageItem.appendChild(removeBtn);
document.getElementById("language-list").appendChild(languageItem);

// Gọi API để lưu Language lên server
document.getElementById("language-list").appendChild(languageItem);

// Gọi API để lưu Language lên server
fetch('/api/save-language', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ language: languageName })
});

document.getElementById("add-language").querySelector("form").reset();
closeLanguageForm();
});

// Hàm xóa kỹ năng trong Profile
function removeLanguages(button) {
// Gọi API để xóa Language từ server
fetch('/api/delete-language', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ language: button.parentElement.textContent.replace("Remove", "").trim() })
});

button.parentElement.remove();
}

//Hiển thị thông tin của Certificate
document.querySelector("#add-certificate form").addEventListener("submit", function (event) {
event.preventDefault(); // Ngăn chặn reload trang

// Lấy giá trị từ form nhập
let certName = document.getElementById("certificate-name").value;
let organization = document.getElementById("organization").value;
let certMonth = document.querySelector("#add-certificate select:nth-of-type(1)").value;
let certYear = document.querySelector("#add-certificate select:nth-of-type(2)").value;

// Kiểm tra nếu người dùng chưa nhập đủ dữ liệu
if (!certName || !organization || !certMonth || !certYear) {
alert("Vui lòng nhập đầy đủ thông tin.");
return;
}

// Tạo một phần tử div mới để hiển thị mục Certificate
let certificateItem = document.createElement("div");
certificateItem.classList.add("certificate-item");
certificateItem.innerHTML = `
<h4>${certName}</h4>
<p><strong>Organization:</strong> ${organization}</p>
<p><strong>Issued:</strong> ${certMonth}/${certYear}</p>
<button onclick="removeCertificate(this)">Remove</button>
`;

// Thêm phần tử mới vào danh sách Certificate
document.getElementById("certificate-list").appendChild(certificateItem);

// Gọi API để lưu Certificate lên server
fetch('/api/save-certificate', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ certName, organization, certMonth, certYear })
});

// Xóa dữ liệu trong form sau khi thêm
document.getElementById("add-certificate").querySelector("form").reset();

// Ẩn form Certificate sau khi thêm
closeCertificateForm();
});

// Hàm xóa một mục Certificate
function removeCertificate(button) {
// Gọi API để xóa Certificate từ server
fetch('/api/delete-certificate', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ certName: button.parentElement.querySelector("h4").textContent })
});

button.parentElement.remove();
}
//Hiển thị thông tin của Prize
document.querySelector("#add-prize form").addEventListener("submit", function (event) {
event.preventDefault(); // Ngăn chặn reload trang

// Lấy giá trị từ form nhập
let prizeName = document.getElementById("prize-name").value;
let organization = document.getElementById("prize-organization").value;
let prizeMonth = document.getElementById("prize-month").value;
let prizeYear = document.getElementById("prize-year").value;

// Kiểm tra nếu người dùng chưa nhập đủ dữ liệu
if (!prizeName || !organization || !prizeMonth || !prizeYear) {
alert("Vui lòng nhập đầy đủ thông tin.");
return;
}

// Tạo một phần tử div mới để hiển thị mục Prize
let prizeItem = document.createElement("div");
prizeItem.classList.add("prize-item");
prizeItem.innerHTML = `
<h4>${prizeName}</h4>
<p><strong>Organization:</strong> ${organization}</p>
<p><strong>Date Received:</strong> ${prizeMonth}/${prizeYear}</p>
<button onclick="removePrize(this)">Remove</button>
`;

// Thêm phần tử mới vào danh sách Prize
document.getElementById("prize-list").appendChild(prizeItem);

// Gọi API để lưu Prize lên server
fetch('/api/save-prize', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ prizeName, organization, prizeMonth, prizeYear })
});

// Xóa dữ liệu trong form sau khi thêm
document.getElementById("add-prize").querySelector("form").reset();

// Ẩn form Prize sau khi thêm
closePrizeForm();
});

// Hàm xóa một mục Prize
function removePrize(button) {
// Gọi API để xóa Prize từ server
fetch('/api/delete-prize', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ prizeName: button.parentElement.querySelector("h4").textContent })
});

button.parentElement.remove();
}
//Hiển thị thông tin của Project
document.querySelector("#add-project form").addEventListener("submit", function (event) {
event.preventDefault(); // Ngăn chặn reload trang

// Lấy giá trị từ form nhập
let projectName = document.getElementById("project-name").value;
let customer = document.getElementById("project-customer").value;
let position = document.getElementById("project-position").value;
let mission = document.getElementById("project-mission").value;
let technology = document.getElementById("project-technology").value;
let beginMonth = document.getElementById("project-begin-month").value;
let beginYear = document.getElementById("project-begin-year").value;
let endMonth = document.getElementById("project-end-month").value;
let endYear = document.getElementById("project-end-year").value;

// Kiểm tra nếu người dùng chưa nhập đủ dữ liệu
if (!projectName || !position || !mission || !technology || !beginMonth || !beginYear || !endMonth || !endYear) {
alert("Vui lòng nhập đầy đủ thông tin.");
return;
}

// Tạo một phần tử div mới để hiển thị mục Project
let projectItem = document.createElement("div");
projectItem.classList.add("project-item");
projectItem.innerHTML = `
<h4>${projectName}</h4>
<p><strong>Customer:</strong> ${customer}</p>
<p><strong>Position:</strong> ${position}</p>
<p><strong>Mission:</strong> ${mission}</p>
<p><strong>Technology:</strong> ${technology}</p>
<p><strong>Time:</strong> ${beginMonth}/${beginYear} - ${endMonth}/${endYear}</p>
<button onclick="removeProject(this)">Remove</button>
`;

// Thêm phần tử mới vào danh sách Project
document.getElementById("project-list").appendChild(projectItem);

// Gọi API để lưu Project lên server
fetch('/api/save-project', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ projectName, customer, position, mission, technology, beginMonth, beginYear, endMonth, endYear })
});

// Xóa dữ liệu trong form sau khi thêm
document.getElementById("add-project").querySelector("form").reset();

// Ẩn form Project sau khi thêm
closeProjectForm();
});

// Hàm xóa một mục Project
function removeProject(button) {
// Gọi API để xóa Project từ server
fetch('/api/delete-project', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ projectName: button.parentElement.querySelector("h4").textContent })
});

button.parentElement.remove();
}

//Lưu dữ liệu 
function saveProfile() {
let profileData = {
fullName: document.querySelector(".profile-info h2").textContent,
jobPosition: document.querySelector(".profile-info h3").textContent,
intro: document.querySelector(".profile-info h4").textContent,
avatar: document.getElementById("avatar-img").src,
cover: document.getElementById("cover-img").src,
address: document.getElementById("address").value || "Not Provided",
email: document.getElementById("email").value || "Not Provided",
phone: document.getElementById("phone").value || "Not Provided",
github: document.getElementById("github").value || "Not Provided",
education: [...document.querySelectorAll("#education-list .education-item")].map(item => ({
    school: item.querySelector("h4").textContent,
    major: item.querySelector("p:nth-of-type(1)").textContent.replace("Major: ", ""),
    time: item.querySelector("p:nth-of-type(2)").textContent.replace("Time: ", "")
})),
experience: [...document.querySelectorAll("#experience-list .experience-item")].map(item => ({
    company: item.querySelector("h4").textContent,
    position: item.querySelector("p:nth-of-type(1)").textContent.replace("Position: ", ""),
    time: item.querySelector("p:nth-of-type(2)").textContent.replace("Time: ", ""),
    description: item.querySelector("p:nth-of-type(3)").textContent.replace("Detailed Description: ", "")
})),
skills: [...document.querySelectorAll("#skill-list li")].map(li => li.textContent.replace("Remove", "").trim()),
languages: [...document.querySelectorAll("#language-list li")].map(li => li.textContent.replace("Remove", "").trim()),
certificates: [...document.querySelectorAll("#certificate-list .certificate-item")].map(item => ({
    name: item.querySelector("h4").textContent,
    organization: item.querySelector("p:nth-of-type(1)").textContent.replace("Organization: ", ""),
    date: item.querySelector("p:nth-of-type(2)").textContent.replace("Issued: ", "")
})),
prizes: [...document.querySelectorAll("#prize-list .prize-item")].map(item => ({
    name: item.querySelector("h4").textContent,
    organization: item.querySelector("p:nth-of-type(1)").textContent.replace("Organization: ", ""),
    date: item.querySelector("p:nth-of-type(2)").textContent.replace("Date Received: ", "")
})),
projects: [...document.querySelectorAll("#project-list .project-item")].map(item => ({
    name: item.querySelector("h4").textContent,
    customer: item.querySelector("p:nth-of-type(1)").textContent.replace("Customer: ", ""),
    position: item.querySelector("p:nth-of-type(2)").textContent.replace("Position: ", ""),
    mission: item.querySelector("p:nth-of-type(3)").textContent.replace("Mission: ", ""),
    technology: item.querySelector("p:nth-of-type(4)").textContent.replace("Technology: ", ""),
    startDate: item.querySelector("p:nth-of-type(5)").textContent.split(" - ")[0],
    endDate: item.querySelector("p:nth-of-type(5)").textContent.split(" - ")[1]
}))
};

// Gọi API để lưu toàn bộ dữ liệu lên server
fetch('/api/save-profile', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(profileData)
});

// Hiển thị popup với hiệu ứng fadeIn
let savePopup = document.getElementById("save-popup");
savePopup.style.display = "block";
savePopup.style.backgroundColor = "#004080"; // Màu xanh đậm
savePopup.style.animation = "fadeIn 0.2s ease-in-out"; // Nhanh hơn

// Ẩn popup sau 1.5 giây với hiệu ứng fadeOut
setTimeout(() => {
savePopup.style.animation = "fadeOut 0.3s ease-in-out";
setTimeout(() => {
    savePopup.style.display = "none";
}, 300);
}, 1500);
}

// Khi bấm "View CV", mở trang CV
function openCVPage() {
window.open("cv.html", "_blank");
}

// Tải dữ liệu khi trang được load
window.onload = function () {
fetch('/api/load-profile')
.then(response => response.json())
.then(profileData => {
    if (profileData) {
        document.querySelector(".profile-info h2").textContent = profileData.fullName || "Your Name";
        document.querySelector(".profile-info h3").textContent = profileData.jobPosition || "Job Position";
        document.querySelector(".profile-info h4").textContent = profileData.intro || "Introduce yourself";

        document.getElementById("education-list").innerHTML = profileData.education.map(edu => `
            <div class="education-item">
                <h4>${edu.school}</h4>
                <p>Major: ${edu.major}</p>
                <p>Time: ${edu.time}</p>
            </div>
        `).join("");

        document.getElementById("experience-list").innerHTML = profileData.experience.map(exp => `
            <div class="experience-item">
                <h4>${exp.company}</h4>
                <p>Position: ${exp.position}</p>
                <p>Time: ${exp.time}</p>
                <p>Detailed Description: ${exp.description}</p>
            </div>
        `).join("");

        let skillList = document.getElementById("skill-list");
        skillList.innerHTML = ""; // Xóa nội dung cũ

        if (profileData.skills) {
            profileData.skills.forEach(skill => {
                let skillItem = document.createElement("li");
                skillItem.textContent = skill; // Chỉ thêm nội dung kỹ năng

                // Thêm nút "Remove" khi ở trang Profile
                if (document.getElementById("add-skill")) {
                    let removeBtn = document.createElement("button");
                    removeBtn.textContent = "Remove";
                    removeBtn.onclick = function () {
                        skillItem.remove();
                        // Gọi API để xóa Skill từ server
                        fetch('/api/delete-skill', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ skill })
                        });
                    };

                    skillItem.appendChild(removeBtn);
                }

                skillList.appendChild(skillItem);
            });
        }

        if (profileData.languages) {
            let languageList = document.getElementById("language-list");
            languageList.innerHTML = "";

            profileData.languages.forEach(language => {
                let languageItem = document.createElement("li");
                languageItem.textContent = language;

                let removeBtn = document.createElement("button");
                removeBtn.textContent = "Remove";
                removeBtn.onclick = function () {
                    languageItem.remove();
                    // Gọi API để xóa Language từ server
                    fetch('/api/delete-language', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ language })
                    });
                };

                languageItem.appendChild(removeBtn);
                languageList.appendChild(languageItem);
            });
        }

        document.getElementById("certificate-list").innerHTML = profileData.certificates.map(cert => `
            <div class="certificate-item">
                <h4>${cert.name}</h4>
                <p>Organization: ${cert.organization}</p>
                <p>Issued: ${cert.date}</p>
            </div>
        `).join("");

        document.getElementById("prize-list").innerHTML = profileData.prizes.map(prize => `
            <div class="prize-item">
                <h4>${prize.name}</h4>
                <p>Organization: ${prize.organization}</p>
                <p>Date Received: ${prize.date}</p>
            </div>
        `).join("");

        document.getElementById("project-list").innerHTML = profileData.projects.map(project => `
            <div class="project-item">
                <h4>${project.name}</h4>
                <p>Customer: ${project.customer}</p>
                <p>Position: ${project.position}</p>
                <p>Mission: ${project.mission}</p>
                <p>Technology: ${project.technology}</p>
                <p>${project.startDate} - ${project.endDate}</p>
            </div>
        `).join("");
    }

    if (profileData.avatar) {
        document.getElementById('avatar-img').src = profileData.avatar;
    }

    if (profileData.cover) {
        document.getElementById('cover-img').src = profileData.cover;
    }
});
};

//Reset Profile
function resetProfile() {
// Hiển thị popup xác nhận
let resetPopup = document.getElementById("reset-popup");
resetPopup.style.display = "block";

// Xử lý khi bấm "Yes"
document.getElementById("confirm-reset").onclick = function () {
// Gọi API để reset profile trên server
fetch('/api/reset-profile', {
    method: 'POST'
}).then(() => {
    // Reset các trường thông tin về mặc định
    document.querySelector(".profile-info h2").textContent = "Your Name";
    document.querySelector(".profile-info h3").textContent = "Job Position";
    document.querySelector(".profile-info h4").textContent = "Introduce yourself";

    // Xóa danh sách các mục đã nhập
    document.getElementById("education-list").innerHTML = "";
    document.getElementById("experience-list").innerHTML = "";
    document.getElementById("skill-list").innerHTML = "";
    document.getElementById("language-list").innerHTML = "";
    document.getElementById("certificate-list").innerHTML = "";
    document.getElementById("prize-list").innerHTML = "";
    document.getElementById("project-list").innerHTML = "";

    // Reset ảnh avatar và ảnh bìa về mặc định
    document.getElementById("avatar-img").src = "images/avatar-trang-4.jpg";
        document.getElementById("cover-img").src = "images/pngtree-futuristic-3d-rendering-of-an-endless-walkway-in-an-unoccupied-room-picture-image_7235050.jpg";

        // Ẩn popup sau khi xác nhận
        resetPopup.style.display = "none";
    });
};

// Xử lý khi bấm "No"
document.getElementById("cancel-reset").onclick = function () {
resetPopup.style.display = "none";
};
}

//Open CV
function openCVPage() {
saveProfile();
window.open("cv.html", "_blank");
}