export type DailyClick = {
    date: string,
    clickCount: number,
}

export type DailyClicksResponse = {
    clickCountHistories: DailyClick[];
}
