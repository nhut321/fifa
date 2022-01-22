var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

const tabItem = $$('.tab-ui__item')

window.onload = () => {
	$('.spinner-box').style.display = 'block'
	const tabItemFirst = $$('.tab-ui__item')[1]
	$('.line-bottom').style.left = tabItemFirst.offsetLeft + 'px'
	$('.line-bottom').style.width = tabItemFirst.offsetWidth + 'px'
}


tabItem.forEach((v,i) => {
	v.onclick = function() {
		const tabContent = $$('.tab-ui__content-item')[i]
		$('.tab-ui__item.active').classList.remove('active')
		$('.tab-ui__content-item.active').classList.remove('active')

		tabContent.classList.add('active')
		this.classList.add('active')

		$('.line-bottom').style.width = v.offsetWidth + 'px'
		$('.line-bottom').style.left = v.offsetLeft + 'px'
	}
})


//.....................................

const urlPremier = `https://apiv3.apifootball.com/?action=get_standings&APIkey=d0f3c828602d68ebd214dbc3bbc3c9919af983b4cac330647728ab4df08db11f&league_id=152`
const tBody = $('.table-standings tbody')
const selectLeagueValue = $$('.select-league option')

fetch('https://apiv3.apifootball.com/?action=get_topscorers&league_id=152&APIkey=d0f3c828602d68ebd214dbc3bbc3c9919af983b4cac330647728ab4df08db11f')
	.then(res => res.json())
	.then(data => {
		let html = ''
		data.forEach((v,i) => {
			return html += `
			<tr class='m-1'>
				<td class='tbody-standing'>
					${i+1}
					<img src="${v.team_badge}" alt="">
					${v.player_name}
				</td>
				<td style='font-weight: bold'>${v.goals}</td>
		  </tr>
			`
		})
		$('.table-stats tbody').innerHTML = html

	})


fetch(urlPremier)
	.then(res => res.json())
	.then(data => {
		let html = ''
		data.map((v,i) => {
			return html += `
				<tr class='m-1'>
			      <td class='tbody-standing'>
			      	${v.overall_league_position}
			      	<img src="${v.team_badge}" alt="">
			      	${v.team_name}
			      </td>
			      <td>${v.overall_league_payed}</td>
			      <td>${v.overall_league_W}</td>
			      <td>${v.overall_league_D}</td>
			      <td>${v.overall_league_L}</td>
			      <td>${v.overall_league_GF}</td>
			      <td>${v.overall_league_GA}</td>
			      <td style='font-weight: bold'>${v.overall_league_PTS}</td>
				</tr>
			`
		})
		$('.spinner-box').style.display = 'none'
		tBody.innerHTML = html
		const tbodyRow = $$('.table-standings tbody tr')
		tbodyRow.forEach((v,i) => {
			if(i<3) {
				v.style.borderLeft = '5px solid #4285F4'
			}
			if (i>16) v.style.borderLeft = '5px solid #ea4335'
		})


	})
	.catch(err => console.log(err))


	var urlValue = ''

	const selectInput = $('.form-select__league')
	const headerForm = $('.header-form')
	headerForm.onsubmit = e => {
		const url = 'https://apiv3.apifootball.com/?action=get_standings&APIkey=d0f3c828602d68ebd214dbc3bbc3c9919af983b4cac330647728ab4df08db11f&league_id='
		e.preventDefault()
		$('.spinner-box').style.display = 'block'
		urlValue = selectInput.value
		fetch(url + urlValue)
			.then(res => res.json())
			.then(data => {
				let html = ''
				data.map((v,i) => {
					return html += `
						<tr class='m-1'>
						<td class='tbody-standing'>
							${v.overall_league_position}
							<img src="${v.team_badge}" alt="">
							${v.team_name}
						</td>
						<td>${v.overall_league_payed}</td>
						<td>${v.overall_league_W}</td>
						<td>${v.overall_league_D}</td>
						<td>${v.overall_league_L}</td>
						<td>${v.overall_league_GF}</td>
						<td>${v.overall_league_GA}</td>
						<td style='font-weight: bold'>${v.overall_league_PTS}</td>
						</tr>

					`
				})
				$('.spinner-box').style.display = 'none'
				tBody.innerHTML = html
				const tbodyRow = $$('.table-standings tbody tr')
				tbodyRow.forEach((v,i) => {
					if(i<3) {
						v.style.borderLeft = '5px solid #4285F4'
					}
					if (i>16) v.style.borderLeft = '5px solid #ea4335'
				})
			})
			.catch(err => console.log(err))
		console.log(urlValue)
	}

// .............................................

