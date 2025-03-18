export enum PIC_REVIEW_STATUS_ENUM {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

export const PIC_REVIEW_STATUS_MAP: Record<PIC_REVIEW_STATUS_ENUM, string> = {
  [PIC_REVIEW_STATUS_ENUM.REVIEWING]: '待审核',
  [PIC_REVIEW_STATUS_ENUM.PASS]: '通过',
  [PIC_REVIEW_STATUS_ENUM.REJECT]: '拒绝',
}

export const PIC_REVIEW_STATUS_OPTIONS = Object.keys(PIC_REVIEW_STATUS_MAP).map((key) => {
  return {
    label: PIC_REVIEW_STATUS_MAP[key as unknown as PIC_REVIEW_STATUS_ENUM],
    value: Number(key),
  }
})
