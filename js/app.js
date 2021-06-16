const dateSelect = $('#date-select');
let dataVaccine;
let dateVacc = [];
const Vaccinated = {vaksinasi1: [], vaksinasi2: []};

const maxCanvasWidth = window.matchMedia("(max-width: 700px)");

AOS.init();

function responsiveCanvas(width) {
    if (width.matches) {
        $('#vacc-chart').attr('height', 500);
    } else {
        $('#vacc-chart').attr('height', 100);
    }
}

responsiveCanvas(maxCanvasWidth);
maxCanvasWidth.addListener(responsiveCanvas);

let vaccDateStatistic = new Chart($('#vacc-date-chart'), {
    type: 'doughnut',
    data: {
        labels: ['Lanjut Usia Tahap 1', 'Pekerja Publik Tahap 1', 'SDM Kesehatan Tahap 1', ],
        datasets: [
            {
                label: '1',
                data: [],
                borderColor: ['#FD927F', '#3C83B6', '#3DCAA0',],
                backgroundColor: ['#f8765f', '#287bb5', '#20c997', ],
            },
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Total sudah vaksin tahap 1'
            }
        }
    },
    responsive: true
    }
);

let vaccDateStatistic2 = new Chart($('#vacc-date-chart2'), {
    type: 'doughnut',
    data: {
        labels: ['Lanjut Usia Tahap 2', 'Pekerja Publik Tahap 2', 'SDM Kesehatan Tahap 2'],
        datasets: [
            {
                label: '1',
                data: [],
                borderColor: ['#FD927F', '#3C83B6', '#3DCAA0',],
                backgroundColor: ['#f8765f', '#287bb5', '#20c997', ],
            },
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Total sudah vaksin tahap 2'
            }
        }
    },
    responsive: true
    }
);

    async function getData() {
        let response = await fetch('https://cekdiri.id/vaksinasi/');
        let data = await response.json();

        console.log(data['monitoring']);

        data['monitoring'].forEach((data, index) => {
            dateSelect.append(`<option value="${data['date']}">${data['date']}</option>`);

            dateVacc.push(data['date']);
            // Vaccinated1.lansia.push(data['tahapan_vaksinasi']['lansia']['sudah_vaksin1']);
            // Vaccinated1.pp.push(data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin1']);
            // Vaccinated1.sdmk.push(data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin1']);

            // Vaccinated2.lansia.push(data['tahapan_vaksinasi']['lansia']['sudah_vaksin2']);
            // Vaccinated2.pp.push(data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin2']);
            // Vaccinated2.sdmk.push(data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin2']);
            Vaccinated.vaksinasi1.push(data['vaksinasi1']);
            Vaccinated.vaksinasi2.push(data['vaksinasi2']);
        });

        let options = $('select#date-select option');
        let arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
        arr.sort(function(o1, o2) { return o1.t < o2.t ? 1 : o1.t > o2.t ? -1 : 0; });
        options.each(function(i, o) {
            o.value = arr[i].v;
            $(o).text(arr[i].t);
        });

        let selectedDate = $('#date-select').find(":selected").val();

        dataVaccine = data;

        changeData();
    }
    chartData();

    function changeData() {
        let selectedDate = $('#date-select').find(":selected").val();

        dataVaccine['monitoring'].forEach((data, index) => {
            if (data['date'] == selectedDate){
                $('.vaccine-date').html(selectedDate);

                $('#vaccine-percent').html(data['cakupan']['vaksinasi1']);
                $('#vaccine-progress').attr('style',  'width:' + data['cakupan']['vaksinasi1']);
                $('#vaccine-progress').attr('aria-valuenow', parseInt(data['cakupan']['vaksinasi1']));    
                $('#vaccine-progress').html(data['cakupan']['vaksinasi1']);
                $('#vaccine-percent2').html(data['cakupan']['vaksinasi2']);
                $('#vaccine-progress2').attr('style',  'width:' + data['cakupan']['vaksinasi2']);
                $('#vaccine-progress2').attr('aria-valuenow', parseInt(data['cakupan']['vaksinasi2']));    
                $('#vaccine-progress2').html(data['cakupan']['vaksinasi2']);

                $('.vaccine-percent-elderly').html(data['cakupan']['lansia_vaksinasi1']);
                $('.vaccine-percent-elderly2').html(data['cakupan']['lansia_vaksinasi2']);
                $('.vaccine-percent-public-worker').html(data['cakupan']['petugas_publik_vaksinasi1']);
                $('.vaccine-percent-public-worker2').html(data['cakupan']['petugas_publik_vaksinasi2']);
                $('.vaccine-percent-medic-worker').html(data['cakupan']['sdm_kesehatan_vaksinasi1']);
                $('.vaccine-percent-medic-worker2').html(data['cakupan']['sdm_kesehatan_vaksinasi2']);

                $('#vaccine-elderly').html(data['tahapan_vaksinasi']['lansia']['sudah_vaksin1']);
                $('#vaccine-elderly2').html(data['tahapan_vaksinasi']['lansia']['sudah_vaksin2']);
                $('#vaccine-public-worker').html(data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin1']);
                $('#vaccine-public-worker2').html(data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin2']);
                $('#vaccine-medic-worker').html(data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin1']);
                $('#vaccine-medic-worker2').html(data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin2']);

                vaccDateStatistic.data.datasets[0].data[0] = data['tahapan_vaksinasi']['lansia']['sudah_vaksin1'];
                vaccDateStatistic2.data.datasets[0].data[0] = data['tahapan_vaksinasi']['lansia']['sudah_vaksin2'];
                vaccDateStatistic.data.datasets[0].data[1] = data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin1'];
                vaccDateStatistic2.data.datasets[0].data[1] = data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin2'];
                vaccDateStatistic.data.datasets[0].data[2] = data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin1'];
                vaccDateStatistic2.data.datasets[0].data[2] = data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin2'];
                vaccDateStatistic.update();
                vaccDateStatistic2.update();
            }
        });
    }

    async function chartData() {
        await getData();
        const vacChart = $('#vacc-chart');
        const totalDuration = 8000;
        const delayBetweenPoints = totalDuration / Vaccinated.vaksinasi1.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        const animation = {
            x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN, // the point is initially skipped
                delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
                }
            },
            y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
                }
            }
        };

        let vaccStatistic = new Chart(vacChart, {
                type: 'line',
                data: {
                    labels: dateVacc,
                    datasets: [
                        {
                            label: 'Vaksinasi Dosis 1',
                            data: Vaccinated.vaksinasi1,
                            borderColor: '#174C72',
                            backgroundColor: '#2C4DC49C',
                        },
                        {
                            label: 'Vaksinasi Dosis 2',
                            data: Vaccinated.vaksinasi2,
                            borderColor: '#228861',
                            backgroundColor: '#2FB38087',
                        },
                    ]
                },
                options: {
                    animation,
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: (vacChart) => 'Total Vaksinasi COVID-19 di Indonesia'
                      },
                      tooltip: {
                        mode: 'index'
                      },
                    },
                    interaction: {
                      mode: 'nearest',
                      axis: 'x',
                      intersect: false
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: 'Tanggal divaksinasi'
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: 'Jumlah Penduduk yang telah divaksinasi'
                        }
                      }
                    },
                    responsive: true
                  }
            }
        );
    }

    dateSelect.change(function(){
        changeData();
    });



//covid 19 cases

const COVIDAPIURL = `https://api.covid19api.com`;
const totalPositive = $('#positive-case')
const active = $('#active-case')
const recovered = $('#recovered-case')
const deaths = $('#deaths')
const dateElement = $('#covid-date');

fetch(`${COVIDAPIURL}/total/country/indonesia`)
.then(response => response.json())
.then(async json => {
    let data = json.pop();
    
    let {Country, Confirmed, Deaths, Recovered, Active, Date : DataDate} = data;
    console.log(Country, Confirmed, Deaths, Recovered, Active, DataDate);
    let dateObject = new Date(DataDate);
    let dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    let day = dateObject.getDay();
    let dateOfMonth = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();

    totalPositive.html(Confirmed);
    active.html(Active);
    recovered.html(Recovered);
    deaths.html(Deaths);
    dateElement.html(`${dayNames[day]}, ${dateOfMonth}-${month}-${year}`);

})
