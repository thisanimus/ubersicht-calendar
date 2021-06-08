function getWeeksInMonth(year, month) {
	const weeks = [],
	firstDate = new Date(year, month, 1),
	lastDate = new Date(year, month + 1, 0),
	numDays = lastDate.getDate();

	let dayOfWeekCounter = firstDate.getDay();

	for (let date = 1; date <= numDays; date++) {
	if (dayOfWeekCounter === 0 || weeks.length === 0) {
		weeks.push([]);
	}
	weeks[weeks.length - 1].push(date);
	dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
	}
	let firstWeek = weeks[0];
	let lastWeek = weeks[weeks.length - 1];
	let firstWeekMakeup = 7 - firstWeek.length;
	let lastWeekMakeup = 7 - lastWeek.length;

	for (let i = 0; i < firstWeekMakeup; i++) {
		firstWeek.unshift("");
	}
	for (let i = 0; i < lastWeekMakeup; i++) {
		lastWeek.push("");
	}
	return weeks
}

export const styles = `
	.animus-calendar{
		position:fixed;
		bottom:100px;
		left:20px;
		color:#fff;
		font-family: -apple-system;
		text-shadow: 1px 1px 5px rgba(0,0,0,0.9);
		font-weight:200;
	}
	.animus-calendar caption{
		text-align:left;
		margin:0 0 0 .7rem;
		font-size:32px;
		font-weight:200;
		opacity:.8;
	}
	.animus-calendar th{
		font-weight:200;
		opacity:.6;
	}
	.animus-calendar td{
		opacity:.75;
	}
	.animus-calendar th, .animus-calendar td{
		padding:.5em;
		text-align:center;
		line-height:1.1;
	}
	.animus-calendar .today{
		font-weight:400;
		opacity:1;
		position:relative;
	}
	.animus-calendar .today:before{
		content:'';
		z-index:-1;
		position:absolute;
		height:2em;
		width:2em;
		border-radius:50%;
		top:.02em;
		left:.14em;
		background:rgba(0,0,0,0.4);
	}
`;
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const monthName = today.toLocaleString('default', {month: 'long'});

export const weeks = getWeeksInMonth(year, month);
export const todayDate = today.getDate();
export const todayDateName = monthName + ' ' + year;

export const render = () => {
	return(
		<div className="animus-calendar">
			<style>
				{styles}
			</style>
			<table>
				<caption>{todayDateName}</caption>
				<tr><th>SU</th><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th></tr>
					{weeks.map((week) => 
						<tr>
						{week.map((day) =>
							<td className={day == todayDate ? 'today' : 'day'}>{day}</td>
						)}
						</tr>
					)}
			</table>
		</div>
	);
}