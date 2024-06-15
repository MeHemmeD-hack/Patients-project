let patientList = document.querySelector(".patient_list");
let pList = document.querySelector(".pList")
let patientInfo = document.querySelector(".patient_info")
let bpm1 = document.querySelector(".bpm1")
let subbpm = document.querySelector(".subbpm")
let subbpm2 = document.querySelector(".subbpm2")
let subbpm3 = document.querySelector(".subbpm3")
let diagnosticList=document.querySelector(".diagnosticList")
let ResultLab=document.querySelector(".ResultLab")
let bloodPressureChart=document.getElementById("bloodPressureChart")
let qan=document.querySelector(".qan")
let tezyiq=document.querySelector(".tezyiq")
let blodcart=document.getElementById("blodcart")
const base64Credentials = btoa("coalition:skills-test");
fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
    method: "GET",
    headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
    }
})
    .then(response => response.json())
    .then((data) => {
        let items = data.map((patient, index) => ({ ...patient, id: index + 1 }));
        showPatient(items[0]);
        Respirator(items[0]);
        Temperature(items[0]);
        Heart(items[0]);
        DiagnosticList(items[0])
        LabResult(items[0])
        DiagSys(items[0])
        Sys(items[0]);
        items.forEach((item) => {
            patientList.innerHTML += `
                <div class="pList" data-id="${item.id}">
                    <div class="pImage">
                        <img src="${item.profile_picture}" alt="${item.imageAlt}">
                        <div class="pText">
                            <h3>${item.name}</h3>
                            <p>${item.gender} ${item.age}</p>
                        </div>
                    </div>
                    <div class="icons">
                        <img src="./img/more_horiz_FILL0_wght300_GRAD0_opsz24@2x.png" alt="">
                    </div>
                </div>
            `;

            document.querySelectorAll('.pList').forEach(item => {
                item.addEventListener('click', function () {
                    const id = this.getAttribute('data-id');
                    const item = items.find(item => item.id == id);
                    showPatient(item);
                    Respirator(item);
                    Temperature(item);
                    Heart(item);
                    DiagnosticList(item);
                    LabResult(item);
                    DiagSys(item);
                    Sys(item);
                });
            });
        });



        console.log(data);
    });

function DiagSys(item){
    qan.innerHTML=`
    <h3>${item.diagnosis_history[0].blood_pressure.systolic.value}</h3>
    <span><img src="./img/ArrowUp.svg"/> ${item.diagnosis_history[0].blood_pressure.systolic.levels}</span>
    `
    let sebuhi = Chart.getChart("myChart");
    if (sebuhi) {
      sebuhi.destroy();
    }
    let sistolicData = [];
    let diastolicData = [];
  
    item.diagnosis_history.forEach(function (sebui) {
      const month = sebui.month;
      const year = sebui.year;
  
      if (
        (year === 2023 && month === "October") ||
        (year === 2023 && month === "November") ||
        (year === 2023 && month === "December") ||
        (year === 2024 && month === "January") ||
        (year === 2024 && month === "February") ||
        (year === 2024 && month === "March")
      ) {
        const bloodPressure = sebui.blood_pressure;
        const systolic = bloodPressure.systolic.value;
        const diastolic = bloodPressure.diastolic.value;
  
        sistolicData.push(systolic);
        diastolicData.push(diastolic);
      }
    });
  
    // qrafik>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
    const ctx = document.getElementById("myChart");
  
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Oct, 2023",
          "Nov, 2023",
          "Dec, 2023",
          "Jan, 2024",
          "Feb, 2024",
          "Mar, 2024",
        ],
        datasets: [
          {
            label: "",
            data: diastolicData,
            borderWidth: 2,
            lineTension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#8C6FE6",
            pointBorderColor: "#8C6FE6",
            borderColor: "#8C6FE6",
          },
          {
            label: "",
            data: sistolicData,
            borderWidth: 2,
            lineTension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#E66FD2",
            pointBorderColor: "#E66FD2",
            borderColor: "#E66FD2",
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
  
        scales: {
          y: {
            beginAtZero: false,
            min: 60,
            max: 180,
            ticks: {
              padding: 10,
              color: "#072635",
              font: {
                size: 12,
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#072635",
              font: {
                size: 12,
              },
            },
          },
        },
  },
});
  }


function Sys(item){
    tezyiq.innerHTML=`
    <h3>${item.diagnosis_history[0].blood_pressure.diastolic.value}</h3>
    <span><img src="./img/ArrowDown.svg"/> ${item.diagnosis_history[0].blood_pressure.diastolic.levels}</span>
    `
}


function Respirator(item) {
    subbpm.innerHTML = `
 <h3>${item.diagnosis_history[0].respiratory_rate.value} bpm</h3>
 <p>${item.diagnosis_history[0].respiratory_rate.levels}</p>`
}

function Temperature(item){
    subbpm2.innerHTML=`
    <h3>${item.diagnosis_history[0].temperature.value} ºF</h3>
 <p>${item.diagnosis_history[0].temperature.levels}</p>
    `
}

function Heart(item){
    subbpm3.innerHTML=`
    <h3>${item.diagnosis_history[0].heart_rate.value} bpm</h3>
 <div class="subimg"> <img src="./img/ArrowDown.svg" alt="m">${item.diagnosis_history[0].heart_rate.levels}</div>
    `
}

function DiagnosticList(item){
    let diagnosisListHtml = '';
    item.diagnostic_list.forEach(listItem => {
        diagnosisListHtml += `<div class="diaglist">
            <p>${listItem.name}</p>
            <p>${listItem.description}</p>
            <p>${listItem.status}</p>
        </div>`

    })
            diagnosticList.innerHTML=diagnosisListHtml;
}

function LabResult(item){
    let labResultHtml = '';
    item.lab_results.forEach(listItem=>{
        labResultHtml += `<div class="labresult">
                    <span>${listItem}<img src="./img/download.svg" alt=""></span>
        `
    })
    ResultLab.innerHTML=labResultHtml
}

 




function showPatient(item) {
    patientInfo.innerHTML = `
            <div class="Patient_Img">
              <img src="${item.profile_picture}" alt="">
                <h3>${item.name}</h3>
                    <div class="Patient_About">
                        <div class="Pb">
                            <img src="./img/BirthIcon.svg" alt="scheduel" />
                            <div>Date Of Birth
                                <p>${item.date_of_birth}</p>
                            </div>
                        </div>
                        <div class="Pb">
                            <img src="./img/FemaleIcon.svg" alt="scheduel" />

                            <div class="subb">Gender
                                <p>${item.gender}</p>
                            </div>
                        </div>

                        <div class="Pb">
                            <img src="./img/PhoneIcon.svg" alt="scheduel" />
                            <div>
                                Contact Info.
                                <p>${item.phone_number}</p>
                            </div>
                        </div>
                        <div class="Pb">
                            <img src="./img/PhoneIcon.svg" alt="scheduel" />
                            <div>
                                Emergency Contacts
                                <p>${item.emergency_contact}</p>
                            </div>
                        </div>
                        <div class="Pb">
                            <img src="./img/InsuranceIcon.svg" alt="scheduel" />
                            <div>Insurance Provider
                                <p>${item.insurance_type}</p>
                            </div>
                        </div>
                    </div>
                <button>Show All Information</button>
            </div>
    `;
}
