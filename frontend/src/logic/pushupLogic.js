const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
    let angle = Math.abs(radians * (180 / Math.PI))
    if (angle > 180) angle = 360 - angle
    return angle
}

export const getPushupFeedback = (landmarks, phaseRef, repCountRef, repCooldownRef, setRepCount, playRepSound, validRepRef) => {
    const leftShoulder = landmarks[11]
    const leftElbow = landmarks[13]
    const leftWrist = landmarks[15]
    const rightShoulder = landmarks[12]
    const rightElbow = landmarks[14]
    const rightWrist = landmarks[16]

    const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist)
    const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist)

    const avgAngle = Math.min(leftElbowAngle, rightElbowAngle)

    let feedback = ""

    if (phaseRef.current === "up") {
        if (Date.now() - repCooldownRef.current < 2000) {
            feedback = ""
        } else if (avgAngle > 155) {
            feedback = "lower your chest"
        } else if (avgAngle <= 155 && avgAngle > 120) {
            feedback = "getting there, keep going"
        } else if (avgAngle <= 120 && avgAngle >= 60) {
            phaseRef.current = "down"
            validRepRef.current = true
            feedback = "perfect depth"
        } else if (avgAngle < 60) {
            phaseRef.current = "down"
            feedback = "too low!"
        }
    } else if (phaseRef.current === "down") {
        if (avgAngle < 60) {
            feedback = "too low!"
        } else if (avgAngle >= 155) {
            window.speechSynthesis.cancel()
            phaseRef.current = "up"
            if (validRepRef.current) {
                repCountRef.current += 1
                setRepCount(repCountRef.current)
                playRepSound()
            }
            validRepRef.current = false
            repCooldownRef.current = Date.now()
            feedback = ""
        } else {
            feedback = ""
        }
    }

    return feedback
}