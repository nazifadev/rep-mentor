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

    let feedback = ""

    if (phaseRef.current === "up") {
        if (Date.now() - repCooldownRef.current < 2000) {
            feedback = ""
        } else if (avgAngle > 150) {
            feedback = "come up more"
        } else if (avgAngle <= 150 && avgAngle > 110) {
            feedback = "getting there, keep going"
        } else if (avgAngle <= 110 && avgAngle >= 80) {
            phaseRef.current = "down"
            feedback = "great crunch!"
        } else if (avgAngle < 80) {
            phaseRef.current = "down"
            feedback = "too far up!"
        }
    } else if (phaseRef.current === "down") {
        if (avgAngle < 80) {
            feedback = "too far up!"
        } else if (avgAngle >= 150) {
            window.speechSynthesis.cancel()
            phaseRef.current = "up"
            repCountRef.current += 1
            setRepCount(repCountRef.current)
            playRepSound()
            repCooldownRef.current = Date.now()
            feedback = ""
        } else {
            feedback = ""
        }
    }

    return feedback
}