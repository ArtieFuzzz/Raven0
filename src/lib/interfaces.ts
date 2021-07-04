interface YiffFile {
	wifth: number
	height: number
	url: string
}
interface YiffScore {
	ups: number
	downs: number
	total: number
}
interface YiffTags {
	general: string[]
	species: string[]
	character: string[]
	copyright: string[]
	artist: string[]
	invalid: string[]
	lore: string[]
}
interface YiffStruct {
	id: number
	file: YiffFile
	score: YiffScore
	tags: YiffTags
	rating: string
	sources: string[]
}

export { YiffStruct }
