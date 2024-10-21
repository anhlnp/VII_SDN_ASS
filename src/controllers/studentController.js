const Student = require('../models/Student');

// Get information
exports.getInfo = (req, res) => {
    res.json({
        data: {
            fullName: "Lê Nguyễn Phúc Anh",
            studentCode: "QE170043"
        }
    });
};

// POST Create a student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        const { name, studentCode, isActive } = student;
        await student.save();

        const responseData = {
            name,
            studentCode,
            isActive
        };
        
        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select('name studentCode isActive');
        res.status(200).json({
            success: true,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong on the server"
        });
    }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select('name studentCode isActive');
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong on the server" });
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    try {
        // Tìm và cập nhật student theo id, trả về các thuộc tính cần thiết
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('name studentCode isActive');
        
        // Nếu không tìm thấy student
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        
        // Trả về kết quả thành công
        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        // Trả về lỗi nếu có vấn đề
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        // Tìm và xóa student theo ID
        const student = await Student.findByIdAndDelete(req.params.id);
        
        // Kiểm tra nếu không tìm thấy student
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Trả về kết quả thành công nếu đã xóa
        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        // Trả về lỗi nếu có vấn đề trong quá trình xử lý
        res.status(500).json({
            success: false,
            message: "Something went wrong on the server"
        });
    }
};