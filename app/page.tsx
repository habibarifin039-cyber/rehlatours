"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Phone, Users, Calendar, MessageCircle, CheckCircle } from "lucide-react"
import Image from "next/image"

interface UmrohFormData {
  registrationId: string
  registrationDate: string
  packageType: string
  departureDate: string
  fullName: string
  fatherName: string
  motherName: string
  birthPlace: string
  birthDate: string
  gender: string
  mahramName: string
  passportNumber: string
  passportIssueDate: string
  passportIssuePlace: string
  passportExpiryDate: string
  nik: string
  address: string
  phone: string
  mobile: string
  email: string
  kelurahan: string
  kecamatan: string
  cityKabupaten: string
  postalCode: string
  mailAddress: string
  occupation: string
  education: string
  previousUmrah: string
  umrahYear: string
  previousHaji: string
  hajiYear: string
  hotelChoice: string
  roomFacility: string
  otherFacility: string
  smoking: string
  hasDisease: string
  diseaseDetail: string
  needSpecialCare: string
  specialCareDetail: string
  needWheelchair: string
  wheelchairWhen: string
  participant1Name: string
  participant1Age: string
  participant1Passport: string
  participant2Name: string
  participant2Age: string
  participant2Passport: string
  participant3Name: string
  participant3Age: string
  participant3Passport: string
  participant4Name: string
  participant4Age: string
  participant4Passport: string
  participant5Name: string
  participant5Age: string
  participant5Passport: string
  participant6Name: string
  participant6Age: string
  participant6Passport: string
  agreement: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function UmrohRegistrationForm() {
  const [formData, setFormData] = useState<UmrohFormData>({
    registrationId: `REG-${Date.now()}`,
    registrationDate: new Date().toISOString().split("T")[0],
    packageType: "",
    departureDate: "",
    fullName: "",
    fatherName: "",
    motherName: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    mahramName: "",
    passportNumber: "",
    passportIssueDate: "",
    passportIssuePlace: "",
    passportExpiryDate: "",
    nik: "",
    address: "",
    phone: "",
    mobile: "",
    email: "",
    kelurahan: "",
    kecamatan: "",
    cityKabupaten: "",
    postalCode: "",
    mailAddress: "",
    occupation: "",
    education: "",
    previousUmrah: "",
    umrahYear: "",
    previousHaji: "",
    hajiYear: "",
    hotelChoice: "",
    roomFacility: "",
    otherFacility: "",
    smoking: "",
    hasDisease: "",
    diseaseDetail: "",
    needSpecialCare: "",
    specialCareDetail: "",
    needWheelchair: "",
    wheelchairWhen: "",
    participant1Name: "",
    participant1Age: "",
    participant1Passport: "",
    participant2Name: "",
    participant2Age: "",
    participant2Passport: "",
    participant3Name: "",
    participant3Age: "",
    participant3Passport: "",
    participant4Name: "",
    participant4Age: "",
    participant4Passport: "",
    participant5Name: "",
    participant5Age: "",
    participant5Passport: "",
    participant6Name: "",
    participant6Age: "",
    participant6Passport: "",
    agreement: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi"
    }
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Nama ayah wajib diisi"
    }
    if (!formData.motherName.trim()) {
      newErrors.motherName = "Nama ibu wajib diisi"
    }
    if (!formData.birthPlace.trim()) {
      newErrors.birthPlace = "Tempat lahir wajib diisi"
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Tanggal lahir wajib diisi"
    }
    if (!formData.gender) {
      newErrors.gender = "Jenis kelamin wajib dipilih"
    }
    if (formData.gender === "Perempuan" && !formData.mahramName.trim()) {
      newErrors.mahramName = "Nama mahram wajib diisi untuk perempuan"
    }
    if (!formData.passportNumber.trim()) {
      newErrors.passportNumber = "Nomor paspor wajib diisi"
    }
    if (!formData.nik.trim()) {
      newErrors.nik = "NIK wajib diisi"
    }
    if (!formData.address.trim()) {
      newErrors.address = "Alamat wajib diisi"
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Nomor handphone wajib diisi"
    }
    if (!formData.packageType) {
      newErrors.packageType = "Jenis paket wajib dipilih"
    }
    if (!formData.departureDate) {
      newErrors.departureDate = "Tanggal keberangkatan wajib diisi"
    }
    if (!formData.agreement) {
      newErrors.agreement = "Anda harus menyetujui syarat dan ketentuan"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof UmrohFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const whatsappMessage = formatWhatsAppMessage(formData)
      console.log("Data untuk WhatsApp API:", whatsappMessage)

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatWhatsAppMessage = (data: UmrohFormData): string => {
    return `
🕌 *PENDAFTARAN UMROH REHLATOURS*

📋 *Data Pendaftaran:*
No. ID: ${data.registrationId}
Tanggal Daftar: ${data.registrationDate}
Paket: ${data.packageType}
Tanggal Berangkat: ${data.departureDate}

👤 *Data Jamaah:*
Nama: ${data.fullName}
Ayah: ${data.fatherName}
Ibu: ${data.motherName}
TTL: ${data.birthPlace}, ${data.birthDate}
Jenis Kelamin: ${data.gender}
${data.gender === "Perempuan" ? `Mahram: ${data.mahramName}` : ""}

📄 *Data Paspor:*
No. Paspor: ${data.passportNumber}
Dikeluarkan: ${data.passportIssuePlace}, ${data.passportIssueDate}
Berlaku hingga: ${data.passportExpiryDate}

🏠 *Alamat:*
${data.address}
${data.kelurahan}, ${data.kecamatan}
${data.cityKabupaten} ${data.postalCode}

📞 *Kontak:*
HP/WA: ${data.mobile}
Email: ${data.email}

🏨 *Akomodasi:*
Hotel: ${data.hotelChoice}
Kamar: ${data.roomFacility}

---
Terima kasih telah mendaftar umroh dengan RehlaTours!
    `.trim()
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-muted-foreground mb-6">
              Terima kasih telah mendaftar umroh dengan RehlaTours. Tim kami akan segera menghubungi Anda.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  registrationId: `REG-${Date.now()}`,
                  registrationDate: new Date().toISOString().split("T")[0],
                  packageType: "",
                  departureDate: "",
                  fullName: "",
                  fatherName: "",
                  motherName: "",
                  birthPlace: "",
                  birthDate: "",
                  gender: "",
                  mahramName: "",
                  passportNumber: "",
                  passportIssueDate: "",
                  passportIssuePlace: "",
                  passportExpiryDate: "",
                  nik: "",
                  address: "",
                  phone: "",
                  mobile: "",
                  email: "",
                  kelurahan: "",
                  kecamatan: "",
                  cityKabupaten: "",
                  postalCode: "",
                  mailAddress: "",
                  occupation: "",
                  education: "",
                  previousUmrah: "",
                  umrahYear: "",
                  previousHaji: "",
                  hajiYear: "",
                  hotelChoice: "",
                  roomFacility: "",
                  otherFacility: "",
                  smoking: "",
                  hasDisease: "",
                  diseaseDetail: "",
                  needSpecialCare: "",
                  specialCareDetail: "",
                  needWheelchair: "",
                  wheelchairWhen: "",
                  participant1Name: "",
                  participant1Age: "",
                  participant1Passport: "",
                  participant2Name: "",
                  participant2Age: "",
                  participant2Passport: "",
                  participant3Name: "",
                  participant3Age: "",
                  participant3Passport: "",
                  participant4Name: "",
                  participant4Age: "",
                  participant4Passport: "",
                  participant5Name: "",
                  participant5Age: "",
                  participant5Passport: "",
                  participant6Name: "",
                  participant6Age: "",
                  participant6Passport: "",
                  agreement: false,
                })
              }}
              className="w-full"
            >
              Daftar Lagi
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="/images/rehla-logo.png"
                alt="RehlaTours Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary">RehlaTours</h1>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Komplek Permata Biru Blok L2 Desa Cinunuk Kecamatan Cileunyi Kab. Bandung Jawa Barat 40624
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto p-4 py-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Formulir Pendaftaran Umroh</CardTitle>
            <CardDescription className="text-lg">
              Silakan lengkapi formulir pendaftaran di bawah ini dengan data yang sesuai dengan paspor
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6 p-4 bg-accent/5 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="registrationId">No. ID Pendaftaran</Label>
                  <Input id="registrationId" value={formData.registrationId} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationDate">Tanggal Pendaftaran</Label>
                  <Input
                    id="registrationDate"
                    type="date"
                    value={formData.registrationDate}
                    onChange={(e) => handleInputChange("registrationDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packageType">Jenis Paket yang Dipilih *</Label>
                  <Select
                    value={formData.packageType}
                    onValueChange={(value) => handleInputChange("packageType", value)}
                  >
                    <SelectTrigger className={errors.packageType ? "border-destructive" : ""}>
                      <SelectValue placeholder="Pilih jenis paket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paket Ekonomi 9 Hari">Paket Ekonomi 9 Hari</SelectItem>
                      <SelectItem value="Paket Reguler 12 Hari">Paket Reguler 12 Hari</SelectItem>
                      <SelectItem value="Paket VIP 14 Hari">Paket VIP 14 Hari</SelectItem>
                      <SelectItem value="Paket Premium 16 Hari">Paket Premium 16 Hari</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.packageType && <p className="text-sm text-destructive">{errors.packageType}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departureDate">Tanggal Keberangkatan *</Label>
                  <Input
                    id="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => handleInputChange("departureDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={errors.departureDate ? "border-destructive" : ""}
                  />
                  {errors.departureDate && <p className="text-sm text-destructive">{errors.departureDate}</p>}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Data Pribadi Jamaah</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fullName">Nama (sesuai paspor) *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Nama lengkap sesuai paspor"
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Nama Ayah *</Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      placeholder="Nama ayah kandung"
                      className={errors.fatherName ? "border-destructive" : ""}
                    />
                    {errors.fatherName && <p className="text-sm text-destructive">{errors.fatherName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motherName">Nama Ibu *</Label>
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                      placeholder="Nama ibu kandung"
                      className={errors.motherName ? "border-destructive" : ""}
                    />
                    {errors.motherName && <p className="text-sm text-destructive">{errors.motherName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthPlace">Tempat Lahir *</Label>
                    <Input
                      id="birthPlace"
                      value={formData.birthPlace}
                      onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                      placeholder="Kota tempat lahir"
                      className={errors.birthPlace ? "border-destructive" : ""}
                    />
                    {errors.birthPlace && <p className="text-sm text-destructive">{errors.birthPlace}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      className={errors.birthDate ? "border-destructive" : ""}
                    />
                    {errors.birthDate && <p className="text-sm text-destructive">{errors.birthDate}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Jenis Kelamin *</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Laki-laki" id="male" />
                        <Label htmlFor="male">Laki-laki</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Perempuan" id="female" />
                        <Label htmlFor="female">Perempuan</Label>
                      </div>
                    </RadioGroup>
                    {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
                  </div>

                  {formData.gender === "Perempuan" && (
                    <div className="space-y-2 md:col-span-2 p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <Label htmlFor="mahramName">Nama Mahram *</Label>
                      <Input
                        id="mahramName"
                        value={formData.mahramName}
                        onChange={(e) => handleInputChange("mahramName", e.target.value)}
                        placeholder="Nama mahram yang mendampingi"
                        className={errors.mahramName ? "border-destructive" : ""}
                      />
                      {errors.mahramName && <p className="text-sm text-destructive">{errors.mahramName}</p>}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Data Paspor</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passportNumber">No. Paspor *</Label>
                    <Input
                      id="passportNumber"
                      value={formData.passportNumber}
                      onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                      placeholder="Nomor paspor"
                      className={errors.passportNumber ? "border-destructive" : ""}
                    />
                    {errors.passportNumber && <p className="text-sm text-destructive">{errors.passportNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passportIssueDate">Tanggal Dikeluarkan</Label>
                    <Input
                      id="passportIssueDate"
                      type="date"
                      value={formData.passportIssueDate}
                      onChange={(e) => handleInputChange("passportIssueDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passportIssuePlace">Dikeluarkan di</Label>
                    <Input
                      id="passportIssuePlace"
                      value={formData.passportIssuePlace}
                      onChange={(e) => handleInputChange("passportIssuePlace", e.target.value)}
                      placeholder="Kota penerbitan paspor"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passportExpiryDate">Tanggal Akhir Berlaku</Label>
                    <Input
                      id="passportExpiryDate"
                      type="date"
                      value={formData.passportExpiryDate}
                      onChange={(e) => handleInputChange("passportExpiryDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Alamat dan Kontak</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="nik">NIK (Nomor Induk Kependudukan) *</Label>
                    <Input
                      id="nik"
                      value={formData.nik}
                      onChange={(e) => handleInputChange("nik", e.target.value)}
                      placeholder="16 digit NIK"
                      className={errors.nik ? "border-destructive" : ""}
                    />
                    {errors.nik && <p className="text-sm text-destructive">{errors.nik}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Alamat *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Alamat lengkap sesuai KTP"
                      rows={3}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telepon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Nomor telepon rumah"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">Handphone / WA *</Label>
                    <Input
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      placeholder="Nomor WhatsApp aktif"
                      className={errors.mobile ? "border-destructive" : ""}
                    />
                    {errors.mobile && <p className="text-sm text-destructive">{errors.mobile}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="alamat@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kelurahan">Kelurahan</Label>
                    <Input
                      id="kelurahan"
                      value={formData.kelurahan}
                      onChange={(e) => handleInputChange("kelurahan", e.target.value)}
                      placeholder="Nama kelurahan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kecamatan">Kecamatan</Label>
                    <Input
                      id="kecamatan"
                      value={formData.kecamatan}
                      onChange={(e) => handleInputChange("kecamatan", e.target.value)}
                      placeholder="Nama kecamatan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cityKabupaten">Kota/Kabupaten</Label>
                    <Input
                      id="cityKabupaten"
                      value={formData.cityKabupaten}
                      onChange={(e) => handleInputChange("cityKabupaten", e.target.value)}
                      placeholder="Nama kota/kabupaten"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Kode Pos</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      placeholder="Kode pos"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="mailAddress">Alamat Surat</Label>
                    <Textarea
                      id="mailAddress"
                      value={formData.mailAddress}
                      onChange={(e) => handleInputChange("mailAddress", e.target.value)}
                      placeholder="Alamat untuk pengiriman surat (jika berbeda)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Pekerjaan/Jabatan</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      placeholder="Pekerjaan saat ini"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Pendidikan Terakhir</Label>
                    <Select value={formData.education} onValueChange={(value) => handleInputChange("education", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih pendidikan terakhir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SD">SD</SelectItem>
                        <SelectItem value="SMP">SMP</SelectItem>
                        <SelectItem value="SMA">SMA</SelectItem>
                        <SelectItem value="D3">D3</SelectItem>
                        <SelectItem value="S1">S1</SelectItem>
                        <SelectItem value="S2">S2</SelectItem>
                        <SelectItem value="S3">S3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Riwayat Perjalanan</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Pernah Pergi Umrah</Label>
                    <RadioGroup
                      value={formData.previousUmrah}
                      onValueChange={(value) => handleInputChange("previousUmrah", value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Belum" id="umrah-belum" />
                        <Label htmlFor="umrah-belum">Belum</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Pernah" id="umrah-pernah" />
                        <Label htmlFor="umrah-pernah">Pernah</Label>
                      </div>
                    </RadioGroup>
                    {formData.previousUmrah === "Pernah" && (
                      <div className="space-y-2">
                        <Label htmlFor="umrahYear">Tahun</Label>
                        <Input
                          id="umrahYear"
                          value={formData.umrahYear}
                          onChange={(e) => handleInputChange("umrahYear", e.target.value)}
                          placeholder="Tahun umrah"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label>Pernah Pergi Haji</Label>
                    <RadioGroup
                      value={formData.previousHaji}
                      onValueChange={(value) => handleInputChange("previousHaji", value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Belum" id="haji-belum" />
                        <Label htmlFor="haji-belum">Belum</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Pernah" id="haji-pernah" />
                        <Label htmlFor="haji-pernah">Pernah</Label>
                      </div>
                    </RadioGroup>
                    {formData.previousHaji === "Pernah" && (
                      <div className="space-y-2">
                        <Label htmlFor="hajiYear">Tahun</Label>
                        <Input
                          id="hajiYear"
                          value={formData.hajiYear}
                          onChange={(e) => handleInputChange("hajiYear", e.target.value)}
                          placeholder="Tahun haji"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Preferensi Akomodasi</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hotelChoice">Hotel yang Dipilih</Label>
                    <Input
                      id="hotelChoice"
                      value={formData.hotelChoice}
                      onChange={(e) => handleInputChange("hotelChoice", e.target.value)}
                      placeholder="Nama hotel pilihan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Fasilitas Kamar yang Dipilih</Label>
                    <RadioGroup
                      value={formData.roomFacility}
                      onValueChange={(value) => handleInputChange("roomFacility", value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Double" id="double" />
                        <Label htmlFor="double">Double</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Triple" id="triple" />
                        <Label htmlFor="triple">Triple</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Quad" id="quad" />
                        <Label htmlFor="quad">Quad</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="otherFacility">Lain-lain</Label>
                    <Input
                      id="otherFacility"
                      value={formData.otherFacility}
                      onChange={(e) => handleInputChange("otherFacility", e.target.value)}
                      placeholder="Fasilitas tambahan yang diinginkan"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Informasi Kesehatan</h3>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label>Merokok</Label>
                      <RadioGroup
                        value={formData.smoking}
                        onValueChange={(value) => handleInputChange("smoking", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Ya" id="smoking-ya" />
                          <Label htmlFor="smoking-ya">Ya</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Tidak" id="smoking-tidak" />
                          <Label htmlFor="smoking-tidak">Tidak</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>Memiliki Penyakit Khusus</Label>
                      <RadioGroup
                        value={formData.hasDisease}
                        onValueChange={(value) => handleInputChange("hasDisease", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Ya" id="disease-ya" />
                          <Label htmlFor="disease-ya">Ya</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Tidak" id="disease-tidak" />
                          <Label htmlFor="disease-tidak">Tidak</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {formData.hasDisease === "Ya" && (
                    <div className="space-y-2">
                      <Label htmlFor="diseaseDetail">Jika ya, sebutkan</Label>
                      <Textarea
                        id="diseaseDetail"
                        value={formData.diseaseDetail}
                        onChange={(e) => handleInputChange("diseaseDetail", e.target.value)}
                        placeholder="Sebutkan penyakit yang dimiliki"
                        rows={2}
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <Label>Apakah memerlukan penanganan khusus</Label>
                    <RadioGroup
                      value={formData.needSpecialCare}
                      onValueChange={(value) => handleInputChange("needSpecialCare", value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Ya" id="care-ya" />
                        <Label htmlFor="care-ya">Ya</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Tidak" id="care-tidak" />
                        <Label htmlFor="care-tidak">Tidak</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.needSpecialCare === "Ya" && (
                    <div className="space-y-2">
                      <Label htmlFor="specialCareDetail">Jika ya, sebutkan</Label>
                      <Textarea
                        id="specialCareDetail"
                        value={formData.specialCareDetail}
                        onChange={(e) => handleInputChange("specialCareDetail", e.target.value)}
                        placeholder="Sebutkan penanganan khusus yang diperlukan"
                        rows={2}
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <Label>Kebutuhan Fasilitas Kursi Roda</Label>
                    <RadioGroup
                      value={formData.needWheelchair}
                      onValueChange={(value) => handleInputChange("needWheelchair", value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Ya" id="wheelchair-ya" />
                        <Label htmlFor="wheelchair-ya">Ya</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Tidak" id="wheelchair-tidak" />
                        <Label htmlFor="wheelchair-tidak">Tidak</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.needWheelchair === "Ya" && (
                    <div className="space-y-2">
                      <Label htmlFor="wheelchairWhen">Jika ya, sebutkan kapan</Label>
                      <Input
                        id="wheelchairWhen"
                        value={formData.wheelchairWhen}
                        onChange={(e) => handleInputChange("wheelchairWhen", e.target.value)}
                        placeholder="Kapan memerlukan kursi roda"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Nama Peserta yang akan bepergian bersama</h3>

                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="grid md:grid-cols-3 gap-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor={`participant${num}Name`}>Nama Peserta {num}</Label>
                        <Input
                          id={`participant${num}Name`}
                          value={formData[`participant${num}Name` as keyof UmrohFormData] as string}
                          onChange={(e) =>
                            handleInputChange(`participant${num}Name` as keyof UmrohFormData, e.target.value)
                          }
                          placeholder={`Nama peserta ${num}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`participant${num}Age`}>Usia</Label>
                        <Input
                          id={`participant${num}Age`}
                          value={formData[`participant${num}Age` as keyof UmrohFormData] as string}
                          onChange={(e) =>
                            handleInputChange(`participant${num}Age` as keyof UmrohFormData, e.target.value)
                          }
                          placeholder="Usia"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`participant${num}Passport`}>No. Paspor</Label>
                        <Input
                          id={`participant${num}Passport`}
                          value={formData[`participant${num}Passport` as keyof UmrohFormData] as string}
                          onChange={(e) =>
                            handleInputChange(`participant${num}Passport` as keyof UmrohFormData, e.target.value)
                          }
                          placeholder="Nomor paspor"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 p-6 bg-accent/5 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreement"
                    checked={formData.agreement}
                    onCheckedChange={(checked) => handleInputChange("agreement", checked as boolean)}
                  />
                  <Label htmlFor="agreement" className="text-sm">
                    Saya setuju mendaftar Umrah dengan REHLATOURS TRAVEL, sesuai dengan syarat dan kondisi terlampir *
                  </Label>
                </div>
                {errors.agreement && <p className="text-sm text-destructive">{errors.agreement}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg font-semibold">
                  {isSubmitting ? "Mengirim Pendaftaran..." : "Daftar Umroh Sekarang"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* WhatsApp Help */}
        <div className="mt-8 text-center">
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-accent" />
                <span className="font-semibold text-accent">Butuh Bantuan?</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Tim RehlaTours siap membantu Anda 24/7</p>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                Chat WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
