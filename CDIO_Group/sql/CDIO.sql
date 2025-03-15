-- Tạo database
CREATE DATABASE CDIO_Student;
USE CDIO_Student;

-- Bảng lưu thông tin đăng nhập
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Bảng profiles (hồ sơ cá nhân)
CREATE TABLE profiles (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    introduction TEXT,
    current_position VARCHAR(255),
    education JSON, -- Lưu dữ liệu dạng JSON
    location VARCHAR(255),
    contact_info TEXT,
    profile_url TEXT,
    email VARCHAR(50),
    phone_number VARCHAR(20),
    address TEXT,
    birthday DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng education (học vấn)
CREATE TABLE education (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    school VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    begin_year YEAR NOT NULL,
    end_year YEAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng experience (kinh nghiệm làm việc)
CREATE TABLE experience (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT,
    begin_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng skills (kỹ năng)
CREATE TABLE skills (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng languages (ngôn ngữ)
CREATE TABLE languages (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    language_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng certificates (chứng chỉ)
CREATE TABLE certificates (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    certificate_name VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    verification_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng prizes (giải thưởng)
CREATE TABLE prizes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    prize_name VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    date_received DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng projects (dự án)
CREATE TABLE projects (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    customer VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    mission TEXT NOT NULL,
    technology TEXT NOT NULL,
    begin_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);






 
 
