import React, { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'

export default function Profile() {
  const { authUser, isUpdatingProfile ,updateProfile} = useAuthStore()
  const [selectedIamage,SetselectedIamage]=useState(null)
  const handleImageUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  // preview image
  SetselectedIamage(URL.createObjectURL(file))

  const formData = new FormData()
  formData.append("profilePic", file)

  await updateProfile(formData)
}

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">

          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your Profile Information</p>
          </div>

          {/* avatar upload */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={selectedIamage ||authUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/12225/12225881.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-base-content
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  hover:scale-105
                  ${
                    isUpdatingProfile
                      ? "animate-pulse pointer-events-none"
                      : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
          </div>

          <p className="text-sm text-zinc-400 text-center">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>
          {/* Profile Details */}
          <div className="space-y-6">

            {/* Full Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>

          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
  <h2 className="text-lg font-medium mb-4">Account Information</h2>

  <div className="space-y-3 text-sm">

    {/* Member Since */}
    <div className="flex items-center justify-between py-2 border-b border-zinc-700">
      <span>Member Since</span>
      <span>{authUser?.createdAt?.split("T")[0]}</span>
    </div>

    {/* Account Status */}
    <div className="flex items-center justify-between py-2">
      <span>Account Status</span>
      <span className="text-green-500 font-medium">Active</span>
    </div>

  </div>
</div>


        </div>
      </div>
    </div>
  )
}
