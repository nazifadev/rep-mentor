const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
    let angle = Math.abs(radians * (180 / Math.PI))
    if (angle > 180) angle = 360 - angle
    return angle
}

export const getSitUpFeedback = (landmarks, phaseRef, repCountRef, repCooldownRef, setRepCount, playRepSound) => {
    const leftShoulder = landmarks[11]
    const leftHip = landmarks[23]
    const leftKnee = landmarks[25]
    const rightShoulder = landmarks[12]
    const rightHip = landmarks[24]
    const rightKnee = landmarks[26]

    const leftHipAngle = calculateAngle(leftShoulder, leftHip, leftKnee)
    const rightHipAngle = calculateAngle(rightShoulder, rightHip, rightKnee)

    const avgAngle = (leftHipAngle + rightHipAngle) / 2

}