const dateSelect = $('#date-select');
let dataVaccine;
let dateVacc = [];
const Vaccinated1 = {lansia: [], pp: [], sdmk: []};
const vacDateChart = $('#vacc-date-chart');

let vaccDateStatistic = new Chart(vacDateChart, {
    type: 'doughnut',
    data: {
        labels: ['Lanjut Usia Tahap 1', 'Lanjut Usia Tahap 2', 'Pekerja Publik Tahap 1', 'Pekerja Publik Tahap 2', 'SDM Kesehatan Tahap 1', 'SDM Kesehatan Tahap 2'],
        datasets: [
            {
                label: '1',
                data: [],
                borderColor: ['rgba(255, 100, 0, 0.4)', 'rgba(0, 0, 255, 0.4)', 'rgba(255, 100, 0, 0.4)', 'rgba(0, 0, 255, 0.4)', 'rgba(150, 255, 0, 0.4)', 'rgba(150, 255, 0, 0.4)'],
                backgroundColor: ['rgba(255, 100, 0, 0.4)', 'rgba(0, 0, 255, 0.4)', 'rgba(255, 100, 0, 0.4)', 'rgba(0, 0, 255, 0.4)', 'rgba(150, 255, 0, 0.4)', 'rgba(150, 255, 0, 0.4)'],
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
            text: 'Total sudah vaksin tahap 1 & 2'
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
            Vaccinated1.lansia.push(data['tahapan_vaksinasi']['lansia']['sudah_vaksin1']);
            Vaccinated1.pp.push(data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin1']);
            Vaccinated1.sdmk.push(data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin1']);
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
                $('#vaccine-stage-1').html(data['vaksinasi1']);
                $('#vaccine-stage-2').html(data['vaksinasi2']);

                $('#vaccine-elderly').html(data['tahapan_vaksinasi']['lansia']['sudah_vaksin1']);
                $('#vaccine-elderly2').html(data['tahapan_vaksinasi']['lansia']['sudah_vaksin2']);
                $('#vaccine-public-worker').html(data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin1']);
                $('#vaccine-public-worker2').html(data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin2']);
                $('#vaccine-medic-worker').html(data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin1']);
                $('#vaccine-medic-worker2').html(data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin2']);

                vaccDateStatistic.data.datasets[0].data[0] = data['tahapan_vaksinasi']['lansia']['sudah_vaksin1'];
                vaccDateStatistic.data.datasets[0].data[1] = data['tahapan_vaksinasi']['lansia']['sudah_vaksin2'];
                vaccDateStatistic.data.datasets[0].data[2] = data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin1'];
                vaccDateStatistic.data.datasets[0].data[3] = data['tahapan_vaksinasi']['petugas_publik']['sudah_vaksin2'];
                vaccDateStatistic.data.datasets[0].data[4] = data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin1'];
                vaccDateStatistic.data.datasets[0].data[5] = data['tahapan_vaksinasi']['sdm_kesehatan']['sudah_vaksin2'];
                vaccDateStatistic.update();
            }
        });
    }

    async function chartData() {
        await getData();
        console.log(Vaccinated1);
        const vacChart = $('#vacc-chart');

        let vaccStatistic = new Chart(vacChart, {
                type: 'line',
                data: {
                    labels: dateVacc,
                    datasets: [
                        {
                            label: 'Lanjut Usia',
                            data: Vaccinated1.lansia,
                            borderColor: 'rgba(255, 0, 0, 1)',
                            backgroundColor: 'rgba(255, 0, 0, 1)',
                        },
                        {
                            label: 'Pekerja Publik',
                            data: Vaccinated1.pp,
                            borderColor: 'rgba(0, 255, 0, 1)',
                            backgroundColor: 'rgba(0, 255, 0, 1)',
                        },
                        {
                            label: 'Sumber Daya Manusia Kesehatan',
                            data: Vaccinated1.sdmk,
                            borderColor: 'rgba(0, 0, 255, 1)',
                            backgroundColor: 'rgba(0, 0, 255, 1)',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: (vacChart) => 'Vaksinasi Tahap 1'
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