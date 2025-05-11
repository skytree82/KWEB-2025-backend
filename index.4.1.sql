-- 학생 테이블 생성
CREATE TABLE `students` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `admission_year` INT NOT NULL,
    `major` VARCHAR(30) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(15),
    `address` VARCHAR(255),
    `total_credits` INT DEFAULT 0,
    `gpa` DECIMAL(3,2),
    `is_enrolled` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;