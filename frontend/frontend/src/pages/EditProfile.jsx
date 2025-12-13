import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'

export default function EditProfile() {
	const userFromStore = useSelector(s => s.user.userData)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [form, setForm] = useState({ name: '', description: '', email: '' })
	const [photoFile, setPhotoFile] = useState(null)
	const [preview, setPreview] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (userFromStore) {
			setForm({
				name: userFromStore.name || '',
				description: userFromStore.description || userFromStore.bio || '',
				email: userFromStore.email || ''
			})
			setPreview(userFromStore.photourl || '')
		}
	}, [userFromStore])

	useEffect(() => {
		if (!photoFile) return
		const url = URL.createObjectURL(photoFile)
		setPreview(url)
		return () => URL.revokeObjectURL(url)
	}, [photoFile])

	const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

	const handleFile = (e) => {
		const f = e.target.files?.[0]
		if (f) setPhotoFile(f)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const fd = new FormData()
			fd.append('name', form.name)
			fd.append('description', form.description)
			fd.append('email', form.email)
			if (photoFile) fd.append('photoUrl', photoFile)

			const res = await axios.post(`${serverURL}/api/user/profile`, fd, { withCredentials: true })
			console.log('profile update response', res.data)
			// backend returns updated user
			const updatedUser = res.data?.user ?? res.data
			console.log('dispatching updated user', updatedUser)
			dispatch(setUserData(updatedUser))
			toast.success('Profile updated')
		navigate('/profile')
		} catch (err) {
			setLoading(false)
			console.error(err)
			toast.error(err?.response?.data?.message || 'Update failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-start justify-center p-8 bg-gray-100">
			<div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
				<h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex items-center gap-4">
						<div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
							{preview ? <img src={preview} alt="preview" className="w-full h-full object-cover" /> : <span className="text-xl">{(form.name && form.name[0]) || 'U'}</span>}
						</div>
						<input type="file" accept="image/*" onChange={handleFile} aria-label="Upload profile photo" />
					</div>

					<div>
						<label className="block text-sm font-medium">Name</label>
						<input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
					</div>

					<div>
						<label className="block text-sm font-medium">Email</label>
						<input name="email" readOnly type="email" value={form.email} className="mt-1 w-full border rounded px-3 py-2" />
					</div>

					<div>
						<label className="block text-sm font-medium">Bio / Description</label>
						<textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 min-h-[100px]" />
					</div>

					<div className="flex gap-2">
						<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
						<button type="button" className="px-4 py-2 border rounded" onClick={() => navigate('/profile')}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	)
}
