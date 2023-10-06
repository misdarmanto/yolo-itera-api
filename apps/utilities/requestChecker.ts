export const requestChecker = ({
  requireList,
  requestData
}: {
  requireList: string[]
  requestData: any
}) => {
  const emptyField: string[] = []
  requireList.map((value: string) => {
    if (!requestData[value]) {
      emptyField.push(value)
    }
  })
  return emptyField.toString()
}
