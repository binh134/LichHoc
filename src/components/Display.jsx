export function Stat({label,value,note,icon:Icon,tone}){return <section className={`stat-card`}><div className={`stat-icon ${tone}`}><Icon size={19}/></div><span>{label}</span><b>{value}</b><small>{note}</small></section>}

export function Field({label,value}){return <label className="field"><span>{label}</span><input defaultValue={value}/></label>}
