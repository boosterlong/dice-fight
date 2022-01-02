type HealthbarProps = {
	current: number
	max: number
}
export default function Healthbar({current, max}:HealthbarProps) {
	let perc = current / max * 100
	if (perc > 0) {
		perc = Math.max(1, perc)
	}
	return (
		<>
			<div className="healthbar-container">
				<div className="healthbar-empty">
					<div className="healthbar-fill" style={{width: `${perc}%`}}>
					</div>
				</div>
			</div>
		</>
	)
}
